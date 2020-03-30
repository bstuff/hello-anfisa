import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Mode } from './_types';

type Props = {
  className?: string;
  power: boolean;
  mode: Mode;
  currentTemperature: number;
  targetTemperature: number;
};

export const Box: FunctionComponent<Props> = (props) => {
  const { className, currentTemperature, targetTemperature, mode, power } = props;

  return (
    <Root className={className}>
      {power && (
        <Output>
          <Measurement>
            <Label>В комнате</Label> <Value>+{currentTemperature}º</Value>
          </Measurement>
          <Measurement>
            <Label>Режим</Label> <Value>{mode}</Value>
          </Measurement>
          <Measurement>
            <Label>Конд.</Label> <Value>+{targetTemperature}º</Value>
          </Measurement>
        </Output>
      )}
    </Root>
  );
};

const Root = styled.div`
  position: relative;
  width: 648px;
  height: 240px;
  background: url(${require('./_assets/box.svg')}) center / contain no-repeat;
`;

const Output = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 404px;
  height: 40px;
  left: 50%;
  top: 112px;
  transform: translateX(-50%);
`;

const Measurement = styled.div``;
const Label = styled.span`
  color: #758179;
`;
const Value = styled.span`
  font-weight: bold;
`;
