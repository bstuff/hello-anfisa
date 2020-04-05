// @ts-ignore
import appRoot from 'app-root-path';
import bodyParser from 'body-parser';
import express from 'express';

import { aliceRouter } from '../alice';
import { frontendRouter } from '../frontend';

import { morgan } from './morgan';

export const server = express();

server.use(morgan());
server.use(bodyParser.json({ limit: '10mb' }));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(appRoot.resolve('/dist/frontend')));

server.use('/', frontendRouter);
server.use('/alice/v1.0', aliceRouter);
