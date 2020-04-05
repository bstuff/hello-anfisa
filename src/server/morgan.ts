import _debug from 'debug';
// @ts-ignore
import _morgan from 'morgan';
import { Writable } from 'stream';

const morganLog = _debug('app:morgan');

const stream = new Writable({
  write(chunk: Buffer, encoding, next) {
    morganLog(chunk.toString('utf8'));
    next();
  },
});

export const morgan = () => _morgan('combined', { stream });
