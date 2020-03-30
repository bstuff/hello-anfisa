import React, { FunctionComponent, ComponentType, useState, useEffect, useMemo } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { Props, CommandMessage } from './_types';

export const withWebsocket = () => <T extends Props>(
  BaseComponent: ComponentType<T>,
): FunctionComponent<T> => (props) => {
  const internal = useMemo<Props>(() => ({} as Props), []);
  const { state, onSetOn, onSetOff, onChangeState } = props;
  Object.assign(internal, { onSetOn, onSetOff, onChangeState });

  const [socketUrl] = useState('ws://localhost:3000');
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);

  useEffect(() => {
    if (!lastMessage) {
      return;
    }

    try {
      const message: CommandMessage = JSON.parse(lastMessage.data);

      switch (message.type) {
        case 'on':
          return internal.onSetOn();
        case 'off':
          return internal.onSetOff();
        case 'changeState':
          return internal.onChangeState(message.state);
        default:
      }
    } catch (err) {}
  }, [lastMessage]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendMessage(JSON.stringify({ type: 'state', state }));
    }
  }, [readyState, state]);

  return <BaseComponent {...props} />;
};
