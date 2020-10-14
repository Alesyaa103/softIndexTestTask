import express from 'express';

export class ErrorResponse extends Error {
  public statusCode: number;

  public message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err: ErrorResponse, res: express.Response) => {
  const { statusCode = 404, message = 'unknown error detected' } = err;

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
