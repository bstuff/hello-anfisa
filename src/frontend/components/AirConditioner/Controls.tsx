import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { resetButton } from '../../lib';

import { Mode } from './_types';

type Props = {
  className?: string;
  power: boolean;
  mode: Mode;
  onPowerClick(): void;
  onTemperatureIncrease(): void;
  onTemperatureDecrease(): void;
  onChangeMode(mode: Mode): void;
};

export const Controls: FunctionComponent<Props> = (props) => {
  const {
    className,
    onChangeMode,
    onPowerClick,
    onTemperatureDecrease,
    onTemperatureIncrease,
    power,
    mode,
  } = props;

  return (
    <Root className={className}>
      <PowerButton onClick={onPowerClick}>{power ? 'Выкл.' : 'Вкл.'}</PowerButton>
      <ButtonGroup>
        <TemperatureButton onClick={onTemperatureIncrease} disabled={!power}>
          +
        </TemperatureButton>
        <TemperatureButton onClick={onTemperatureDecrease} disabled={!power}>
          –
        </TemperatureButton>
      </ButtonGroup>
      <ButtonGroup>
        <HeatButton
          onClick={() => onChangeMode(Mode.heat)}
          active={power && mode === Mode.heat}
          disabled={!power}
        >
          Нагрев
        </HeatButton>
        <CoolButton
          onClick={() => onChangeMode(Mode.cool)}
          active={power && mode === Mode.cool}
          disabled={!power}
        >
          Охлаждение
        </CoolButton>
        <AutoButton
          onClick={() => onChangeMode(Mode.auto)}
          active={power && mode === Mode.auto}
          disabled={!power}
        >
          Авто
        </AutoButton>
        <FanButton
          onClick={() => onChangeMode(Mode.fan)}
          active={power && mode === Mode.fan}
          disabled={!power}
        >
          Обдув
        </FanButton>
      </ButtonGroup>
    </Root>
  );
};

/* eslint-disable import/order */
const Root = styled.div`
  display: flex;
  flex-flow: row nowrap;
  font-family: 'Arial';
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const Button = styled.button`
  ${resetButton};
  padding: 0px 28px;
  height: 64px;
  box-shadow: 0px 13px 14px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  font-size: 20px;
  line-height: 30px;
  user-select: none;
  cursor: pointer;

  &[disabled] {
    opacity: 0.4;
  }
`;

const PowerButton = styled(Button)`
  &::before {
    display: inline-block;
    content: ' ';
    width: 32px;
    height: 32px;
    background: url(${require('./_assets/power.svg')}) center / cover no-repeat;
    margin-right: 1em;
  }

  width: 164px;
  display: flex;
  align-items: center;
  background: #333;
  color: #fff;
`;

const TemperatureButton = styled(Button)`
  background: #fff;
  color: #000;
  margin: 0 0.2em;
  font-size: 42px;
`;

const ModeButton = styled(Button)<{ active: boolean }>`
  &::before {
    display: inline-block;
    content: ' ';
    width: 32px;
    height: 32px;
    margin-right: 1em;
  }

  display: flex;
  align-items: center;
  margin: -2px;
  margin-left: 24px;
  border: 2px solid ${({ active }) => (active ? 'black' : 'transparent')};
`;

const HeatButton = styled(ModeButton)`
  &::before {
    height: 36px;
    background: url(${require('./_assets/heat.svg')}) center / cover no-repeat;
  }

  background: #e72d2d;
  color: #fff;
`;

const CoolButton = styled(ModeButton)`
  &::before {
    background: url(${require('./_assets/cool.svg')}) center / cover no-repeat;
  }

  background: #1774ff;
  color: #fff;
`;

const AutoButton = styled(ModeButton)`
  &::before {
    background: url(${require('./_assets/auto.svg')}) center / cover no-repeat;
  }

  background: #fff;
  color: #000;
`;

const FanButton = styled(ModeButton)`
  &::before {
    background: url(${require('./_assets/fan.svg')}) center / cover no-repeat;
  }

  background: #fff;
  color: #000;
`;
