import { AggregateID, Entity } from '@/core/domain/entity.base';
import { Result } from '@/core/application/result';

export interface RepositoryInterface<T extends Entity<any>> {
  save(entity: any, id?: AggregateID): Promise<Result<T>>;

  findById(id: AggregateID): Promise<T | null>;

  list(): Promise<T[]>;
}
