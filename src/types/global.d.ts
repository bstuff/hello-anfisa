declare namespace NodeJS {
  import { DeviceInterface } from '../alice';

  export interface Global {
    __devices: DeviceInterface[];
  }
}
