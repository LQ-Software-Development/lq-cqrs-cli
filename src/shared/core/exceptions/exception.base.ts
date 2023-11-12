export abstract class ExceptionBase extends Error {
  abstract code: string;

  constructor(
    readonly message: string,
    private readonly _cause?: Error,
    private readonly _metadata?: unknown,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  toLog() {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      cause: JSON.stringify(this._cause),
      metadata: this._metadata,
    };
  }
}
