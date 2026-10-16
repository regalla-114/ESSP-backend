type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
  }

  info(message: string, ...args: unknown[]) {
    console.log(`\x1b[32m${this.formatMessage('info', message)}\x1b[0m`, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    console.warn(`\x1b[33m${this.formatMessage('warn', message)}\x1b[0m`, ...args);
  }

  error(message: string, ...args: unknown[]) {
    console.error(`\x1b[31m${this.formatMessage('error', message)}\x1b[0m`, ...args);
  }

  debug(message: string, ...args: unknown[]) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`\x1b[36m${this.formatMessage('debug', message)}\x1b[0m`, ...args);
    }
  }
}

export const logger = new Logger();
