import _debug from 'debug';
import { BehaviorSubject } from 'rxjs';
import WebSocket from 'ws';

import { CommandMessage, Mode, ACState } from '../../frontend/components/AirConditioner/_types';

const debug = _debug('app:devices:WebAC');
const logSent = debug.extend('sent');
const logRecv = debug.extend('recv');

const defaultState: ACState = {
  currentTemperature: 21,
  targetTemperature: 21,
  mode: Mode.fan,
  power: false,
};

type ConstructorParams = {
  websocket: WebSocket;
};

export class WebAC {
  websocket: WebSocket;
  state$ = new BehaviorSubject<ACState>(defaultState);

  constructor(options: ConstructorParams) {
    const { websocket } = options;

    Object.assign(this, {
      websocket,
    });

    this.websocket.on('message', (message: string) => {
      logRecv(message);
      try {
        const command: CommandMessage = JSON.parse(message);

        switch (command.type) {
          case 'state':
            return this.state$.next(command.state);
          default:
        }
      } catch (err) {}
    });
  }

  async on() {
    this.send({ type: 'on' });
  }

  async off() {
    this.send({ type: 'off' });
  }

  async changeState(state: Partial<ACState>) {
    this.send({ type: 'changeState', state });
  }

  protected send(message: CommandMessage) {
    const raw = JSON.stringify(message);
    logSent(JSON.stringify(message, null, 2));
    this.websocket.send(raw);
  }
}
