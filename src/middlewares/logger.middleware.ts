import * as chalk from 'chalk';
import { format } from 'date-fns';
import { NextFunction, Request, Response } from 'express';

export function logger(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { ip, method, originalUrl } = request;
  const userAgent = request.get('user-agent') || '';

  response.on('finish', () => {
    const { statusCode } = response;
    const contentLength = response.get('content-length');

    const formattedNow = format(new Date(), 'kk:mm:ss');

    const consoleColor = statusCode >= 400 ? 'red' : 'green';

    console.log(
      chalk[consoleColor](
        `--> ${formattedNow} ${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      ),
    );
  });

  next();
}
