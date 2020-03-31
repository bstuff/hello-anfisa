import { CapabilityInterface } from '../interfaces';
import { CapabilityType, CapabilityStateResponse, CapabilityInfoResponse } from '../types';

export class BaseCapability implements CapabilityInterface {
  readonly type: CapabilityType;
  retrievable = true;

  toJson(): CapabilityInfoResponse {
    return {
      type: this.type,
      retrievable: this.retrievable,
    };
  }

  getState(): CapabilityStateResponse {
    return {} as any;
  }
}
