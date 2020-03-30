import React, { FunctionComponent, ComponentType, useState } from 'react';

import { ACState, Props, Mode } from './_types';

type InjectedProps = Props;

export const withState = () => <T extends InjectedProps>(
  BaseComponent: ComponentType<T>,
): FunctionComponent<Omit<T, keyof InjectedProps>> => (props) => {
  const [state, setState] = useState<ACState>({
    currentTemperature: 25,
    targetTemperature: 24,
    mode: Mode.cool,
    power: true,
  });

  const onSetOn = () => setState((st) => ({ ...st, power: true }));
  const onSetOff = () => setState((st) => ({ ...st, power: false }));
  const onChangeState = (md: Partial<ACState>) =>
    setState((st) => {
      const res = { ...st, ...md };
      if (res.targetTemperature > 30) {
        res.targetTemperature = 30;
      }

      if (res.targetTemperature < 16) {
        res.targetTemperature = 16;
      }

      return res;
    });

  return (
    <BaseComponent
      state={state}
      onSetOn={onSetOn}
      onSetOff={onSetOff}
      onChangeState={onChangeState}
      {...(props as T)}
    />
  );
};
