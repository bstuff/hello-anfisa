// @ts-ignore
import appRoot from 'app-root-path';
import bodyParser from 'body-parser';
import express from 'express';
// @ts-ignore
import morgan from 'morgan';

import { aliceRouter } from '../alice';
import { frontendRouter } from '../frontend';

export const server = express();

server.use(morgan('combined'));
server.use(bodyParser.json({ limit: '10mb' }));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(appRoot.resolve('/dist/frontend')));

server.use('/', frontendRouter);
server.use('/alice/v1.0', aliceRouter);
