import { RequestHandler } from 'express';

export const pingMiddleware: RequestHandler = (req, res, next) => {
  res.send();
};
