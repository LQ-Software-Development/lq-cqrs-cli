import {
  ARGUMENT_INVALID,
  ARGUMENT_NOT_PROVIDED,
  ARGUMENT_OUT_OF_RANGE,
  CONFLICT,
  ExceptionBase,
  NOT_FOUND,
  UNAUTHORIZED,
} from '../exceptions';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export abstract class ControllerBase {
  handleErrorResponse(exception: ExceptionBase) {
    switch (exception.code) {
      case ARGUMENT_NOT_PROVIDED:
        throw new BadRequestException(exception.message);
      case ARGUMENT_OUT_OF_RANGE:
        throw new BadRequestException(exception.message);
      case ARGUMENT_INVALID:
        throw new BadRequestException(exception.message);
      case NOT_FOUND:
        throw new NotFoundException(exception.message);
      case UNAUTHORIZED:
        throw new ForbiddenException(exception.message);
      case CONFLICT:
        throw new ConflictException(exception.message);
      default:
        throw new InternalServerErrorException(exception.message);
    }
  }
}
