import { CapabilityInterface, DeviceInterface } from '../interfaces';
import { DeviceInfo, DeviceType } from '../types';

export class BaseDevice implements DeviceInterface {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly room: string;
  readonly type: DeviceType;
  readonly custom_data: Record<string, any>;
  capabilities: Record<string, CapabilityInterface>;
  readonly device_info: DeviceInfo;

  toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      room: this.room,
      type: this.type,
      custom_data: this.custom_data,
      capabilities: Object.values(this.capabilities).map((c) => c.toJson()),
    };
  }

  getState() {
    return {
      id: this.id,
      capabilities: Object.values(this.capabilities).map((c) => c.getState()),
    };
  }

  performChanges(
    _changes: Parameters<DeviceInterface['performChanges']>[0],
  ): ReturnType<DeviceInterface['performChanges']> {
    throw new Error('notImplemented');
  }
}
