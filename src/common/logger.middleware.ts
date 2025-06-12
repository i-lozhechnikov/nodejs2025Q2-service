import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './common.logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, query, body } = req;
    this.logger.log(
      `Request: ${method} ${originalUrl} | Query: ${JSON.stringify(query)} | Body: ${JSON.stringify(body)}`,
    );

    res.on('finish', () => {
      this.logger.log(
        `Response: ${method} ${originalUrl} | Status: ${res.statusCode}`,
      );
    });

    next();
  }
}
