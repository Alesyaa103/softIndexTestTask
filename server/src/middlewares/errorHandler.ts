import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, handleError } from '../helpers/errorResponse';

// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
};

export default errorHandlerMiddleware;
