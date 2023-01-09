import { ICreateUserUseCase, request, result } from './ICreateUserUseCase';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor() {}

  async execute(data: request): Promise<result> {
    return Result.ok({});
  }
}