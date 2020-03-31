import { RequestHandler } from 'express';

import { DeviceListResponse } from '../types';

export const deviceListMiddleware: RequestHandler = (req, res, next) => {
  const request_id = req.header('x-request-id') || '';

  const response: DeviceListResponse = {
    request_id,
    payload: {
      user_id: 'Bstf-01-super-545',
      devices: global.__devices.map((d) => d.toJson()),
    },
  };

  res.json(response);
};
