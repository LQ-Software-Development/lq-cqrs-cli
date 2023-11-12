import { ExceptionBase } from '@core/exceptions';
import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class ControllerBase {
  prepareErrorResponse(error: ExceptionBase) {
    switch (error.code) {
      case 'GENERIC.ARGUMENT_INVALID':
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      case 'GENERIC.ARGUMENT_NOT_PROVIDED':
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      case 'GENERIC.ARGUMENT_OUT_OF_RANGE':
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      case 'GENERIC.CONFLICT':
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      case 'GENERIC.NOT_FOUND':
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      case 'GENERIC.INTERNAL_SERVER_ERROR':
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      case 'GENERIC.UNAUTHORIZED':
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      default:
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
