import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Mode } from './_types';

type Props = {
  className?: string;
  mode: Mode;
  power: boolean;
  targetTemperature: number;
  currentTemperature: number;
};

export const AirFlow: FunctionComponent<Props> = (props) => {
  const { className, mode, targetTemperature, currentTemperature, power } = props;

  return (
    <Root className={className}>
      <FlowRoot
        active={
          power &&
          (mode === Mode.heat || (mode === Mode.auto && targetTemperature > currentTemperature))
        }
      >
        <Flow1 bg={require('./_assets/hot-1.png')} style={{ opacity: 0.4 }} />
        <Flow2 bg={require('./_assets/hot-2.png')} style={{ opacity: 0.4 }} />
      </FlowRoot>
      <FlowRoot
        active={
          power &&
          (mode === Mode.cool || (mode === Mode.auto && targetTemperature < currentTemperature))
        }
      >
        <Flow1 bg={require('./_assets/cold-1.png')} />
        <Flow2 bg={require('./_assets/cold-2.png')} />
      </FlowRoot>
      <FlowRoot
        active={
          power &&
          (mode === Mode.fan || (mode === Mode.auto && targetTemperature === currentTemperature))
        }
      >
        <Flow1 bg={require('./_assets/fan-1.png')} />
        <Flow2 bg={require('./_assets/fan-2.png')} />
      </FlowRoot>
    </Root>
  );
};

const Root = styled.div`
  position: relative;
  width: 976px;
  height: 472px;
  margin-top: -58px;
`;

const FlowRoot = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 500ms;
`;

const Flow1 = styled.div<{ bg: string }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 976px;
  height: 307px;
  background: url(${({ bg }) => bg}) center / cover no-repeat;
`;
const Flow2 = styled.div<{ bg: string }>`
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: 942px;
  height: 458px;
  background: url(${({ bg }) => bg}) center / cover no-repeat;
`;
