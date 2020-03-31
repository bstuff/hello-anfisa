import { BehaviorSubject, Observable } from 'rxjs';

import { CapabilityInterface } from '../interfaces';
import {
  CapabilityType,
  OnOffCapabilityInfoResponse,
  OnOffInstance,
  CapabilityStateChangeRequest,
  OnOffCapabilityStateResponse,
} from '../types';

import { BaseCapability } from './BaseCapability';

export class OnOff extends BaseCapability implements CapabilityInterface {
  readonly type: CapabilityType.OnOff = CapabilityType.OnOff;
  readonly instance: OnOffInstance.on = OnOffInstance.on;
  state$ = new BehaviorSubject({
    instance: this.instance,
    value: false,
  });

  constructor(observable: Observable<boolean>) {
    super();

    observable.subscribe((res) => this.setValue(res));
  }

  toJson(): OnOffCapabilityInfoResponse {
    return {
      type: CapabilityType.OnOff,
      retrievable: true,
    };
  }

  getState(): OnOffCapabilityStateResponse {
    return {
      type: this.type,
      state: this.state$.value,
    };
  }

  setValue(val: boolean) {
    this.state$.next({
      instance: this.instance,
      value: val,
    });
  }

  performChange(change: CapabilityStateChangeRequest): OnOffCapabilityStateResponse | void {
    if (change.type !== this.type) {
      return;
    }

    if (change.state.instance !== this.instance) {
      return;
    }

    return {
      type: this.type,
      state: {
        instance: this.instance,
        value: change.state.value,
      },
    };
  }
}
