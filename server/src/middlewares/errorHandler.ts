import { Request, Response } from 'express';
import { ErrorResponse, handleError } from '../helpers/errorResponse';

const errorHandlerMiddleware = (err: ErrorResponse, req: Request, res: Response) => {
  handleError(err, res);
};

export default errorHandlerMiddleware;
