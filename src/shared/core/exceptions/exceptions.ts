import {
  ARGUMENT_INVALID,
  ARGUMENT_NOT_PROVIDED,
  ARGUMENT_OUT_OF_RANGE,
  CONFLICT,
  ExceptionBase,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from '.';

export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ARGUMENT_INVALID;
}

export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = ARGUMENT_NOT_PROVIDED;
}

export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = ARGUMENT_OUT_OF_RANGE;
}

export class ConflictException extends ExceptionBase {
  readonly code = CONFLICT;
}

export class NotFoundException extends ExceptionBase {
  static readonly message = 'Not found';

  constructor(message = NotFoundException.message) {
    super(message);
  }

  readonly code = NOT_FOUND;
}

export class UnauthorizedException extends ExceptionBase {
  static readonly message = 'Unauthorized';

  constructor(message = UnauthorizedException.message) {
    super(message);
  }

  readonly code = UNAUTHORIZED;
}

export class InternalServerErrorException extends ExceptionBase {
  constructor(error: Error) {
    const message = 'Internal server error';
    super(message, error);

    this.toLog();
  }

  readonly code = INTERNAL_SERVER_ERROR;
}
