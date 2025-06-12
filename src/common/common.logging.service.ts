import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'node:process';

@Injectable()
export class LoggingService {
  private readonly logDir = path.resolve(process.cwd(), 'logs');
  private readonly maxFileSize = parseInt(
    process.env.LOG_MAX_FILE_SIZE || '5000000',
  );
  private readonly logLevel = parseInt(process.env.LOG_LEVEL || '0');

  constructor() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
  }

  private writeLog(file: string, message: string) {
    const filePath = path.join(this.logDir, file);
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size > this.maxFileSize) {
        const backup = filePath.replace('.log', `-${Date.now()}.log`);
        fs.renameSync(filePath, backup);
      }
    }

    fs.appendFileSync(filePath, logMessage);
  }

  private shouldLog(level: number): boolean {
    return level <= this.logLevel;
  }

  log(message: string) {
    if (this.shouldLog(0)) {
      console.log(message);
      this.writeLog('combined.log', message);
    }
  }

  error(message: string) {
    if (this.shouldLog(1)) {
      console.error(message);
      this.writeLog('combined.log', message);
      this.writeLog('error.log', message);
    }
  }

  warn(message: string) {
    if (this.shouldLog(2)) {
      console.warn(message);
      this.writeLog('combined.log', message);
    }
  }

  debug(message: string) {
    if (this.shouldLog(3)) {
      console.debug(message);
      this.writeLog('combined.log', message);
    }
  }

  verbose(message: string) {
    if (this.shouldLog(4)) {
      console.log(message);
      this.writeLog('combined.log', message);
    }
  }
}
