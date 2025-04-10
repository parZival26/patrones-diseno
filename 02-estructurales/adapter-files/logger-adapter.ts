import { Logger } from "jsr:@deno-library/logger";
import { COLORS } from "../../helpers/colors.ts";

// TODO: Implementar el LoggerAdapter

interface ILoggerAdapter {
  file: string;

  writeLog: (msg: string) => void;

  writeError: (msg: string) => void;

  writeWarning: (msg: string) => void;
}

export class DenoLoggerAdapter implements ILoggerAdapter {
  constructor(public file: string) {}

  private readonly logger = new Logger();

  writeLog(msg: string): void {
    this.logger.info(`[${this.file} Log] ${msg}`);
  }

  writeError(msg: string): void {
    this.logger.warn(`[${this.file} Error] %c${msg}`, COLORS.red);
  }

  writeWarning(msg: string): void {
    this.logger.error(`[${this.file} Warning] %c${msg}`, COLORS.yellow);
  }
}
