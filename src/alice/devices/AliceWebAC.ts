import { pluck, map } from 'rxjs/operators';

import { WebAC } from '../../devices';
import { Mode } from '../../frontend/components/AirConditioner/_types';
import { OnOff, RangeTemperature, ModeThermostat } from '../capabilities';
import { CapabilityInterface, DeviceInterface } from '../interfaces';
import {
  DeviceInfo,
  DeviceType,
  ModeThermostatValue,
  CapabilityType,
  ActionResultStatus,
  DeviceStateChangeResponse,
} from '../types';

const modesMap: [Mode, ModeThermostatValue][] = [
  //
  [Mode.cool, ModeThermostatValue.cool],
  [Mode.heat, ModeThermostatValue.heat],
  [Mode.fan, ModeThermostatValue.fan_only],
  [Mode.auto, ModeThermostatValue.auto],
];

export class AliceWebAC implements DeviceInterface {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly room: string;
  readonly type: DeviceType;
  readonly custom_data: Record<string, any>;
  capabilities: Record<string, CapabilityInterface>;
  readonly device_info: DeviceInfo;

  constructor(
    //
    protected _acImpl: WebAC,
  ) {
    Object.assign(this, {
      id: 'alice222',
      type: DeviceType.AC,
      name: 'Веб-кондей',
      room: 'Гостиная',
      capabilities: {
        power: new OnOff(this._acImpl.state$.pipe(pluck('power'))),
        targetTemperature: new RangeTemperature(
          this._acImpl.state$.pipe(pluck('targetTemperature')),
          {
            range: {
              min: 16,
              max: 30,
              precision: 1,
            },
          },
        ),
        mode: new ModeThermostat(
          this._acImpl.state$.pipe(
            pluck('mode'),
            map((mode) => {
              const [, m] = modesMap.find(([mm]) => mm === mode) || [];

              return m || ModeThermostatValue.auto;
            }),
          ),
          {
            modes: modesMap.map(([, m]) => m),
          },
        ),
      },
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      room: this.room,
      type: this.type,
      capabilities: Object.values(this.capabilities).map((c) => c.toJson()),
    };
  }

  getState() {
    return {
      id: this.id,
      capabilities: Object.values(this.capabilities).map((c) => c.getState()),
    };
  }

  async performChanges(
    _changes: Parameters<DeviceInterface['performChanges']>[0],
  ): Promise<DeviceStateChangeResponse> {
    const [changeReq] = _changes;

    switch (changeReq.type) {
      case CapabilityType.OnOff:
        await this._acImpl[changeReq.state.value ? 'on' : 'off']();
        break;
      case CapabilityType.Range: {
        const targetTemperature = changeReq.state.value;
        await this._acImpl.changeState({ targetTemperature });
        break;
      }

      case CapabilityType.Mode: {
        const targetMode = changeReq.state.value;
        const [mode] = modesMap.find(([, mm]) => mm === targetMode) || [];

        await this._acImpl.changeState({ mode });
        break;
      }

      default:
        break;
    }

    return {
      id: this.id,
      action_result: {
        // @ts-ignore
        status: ActionResultStatus.DONE,
      },
    };
  }
}
