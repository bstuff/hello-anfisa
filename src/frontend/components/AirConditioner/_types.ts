export type ACState = {
  power: boolean;
  mode: Mode;
  currentTemperature: number;
  targetTemperature: number;
};

export type Props = {
  state: ACState;
  onChangeState(state: Partial<ACState>): void;
  onSetOn(): void;
  onSetOff(): void;
};

export enum Mode {
  heat = 'heat',
  cool = 'cool',
  auto = 'auto',
  fan = 'fan',
}

export type CommandMessage =
  | {
      type: 'on';
    }
  | {
      type: 'off';
    }
  | {
      type: 'changeState';
      state: Partial<ACState>;
    }
  | {
      type: 'state';
      state: ACState;
    };
