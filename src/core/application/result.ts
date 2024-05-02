import { ExceptionBase } from '../exceptions';

export class Result<T> {
  isSuccess: boolean;
  isFailure: boolean;
  error: ExceptionBase;
  private readonly _value?: T;

  constructor(isSuccess: boolean, error: ExceptionBase, value?: T) {
    if (isSuccess && error) throw new Error('Internal Error');

    if (!isSuccess && !error) throw new Error('Internal Error');

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;
  }

  get value(): T {
    return this._getValue();
  }

  static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  static fail<U>(error: ExceptionBase): Result<U> {
    return new Result<U>(false, error);
  }

  private _getValue(): T {
    if (!this.isSuccess) {
      throw new Error('Cant return value from a failure result');
    }

    return this._value;
  }
}
