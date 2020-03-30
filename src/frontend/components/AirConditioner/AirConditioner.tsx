import React, { FunctionComponent } from 'react';
import { pipe } from 'rxjs';
import styled from 'styled-components';

import { Mode, Props } from './_types';
import { AirFlow } from './AirFlow';
import { Box } from './Box';
import { Controls } from './Controls';
import { withState } from './withState';

export const AirConditioner: FunctionComponent<Props> = (props) => {
  const { state, onSetOn, onSetOff, onChangeState } = props;

  return (
    <Root>
      <h2>AirConditioner</h2>
      <Box
        mode={state.mode}
        power={state.power}
        currentTemperature={state.currentTemperature}
        targetTemperature={state.targetTemperature}
      />
      <AirFlow
        mode={state.mode}
        power={state.power}
        currentTemperature={state.currentTemperature}
        targetTemperature={state.targetTemperature}
      />
      <StyledControls
        mode={state.mode}
        power={state.power}
        onPowerClick={state.power ? onSetOff : onSetOn}
        onTemperatureDecrease={() =>
          onChangeState({ targetTemperature: state.targetTemperature - 1 })
        }
        onTemperatureIncrease={() =>
          onChangeState({ targetTemperature: state.targetTemperature + 1 })
        }
        onChangeMode={(mode: Mode) => onChangeState({ mode })}
      />
    </Root>
  );
};

export const AirConditionerContainer = pipe(
  //
  // withWebsocket(),
  withState(),
)(AirConditioner);

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const StyledControls = styled(Controls)`
  position: fixed;
  bottom: 50px;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
`;
