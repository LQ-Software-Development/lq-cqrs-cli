import { Result } from './result';

export interface IUseCase<Params, TResult extends Result<unknown>> {
  execute(params: Params): Promise<TResult>;
}
