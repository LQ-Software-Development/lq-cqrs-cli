import { Entity } from './entity.base';

export interface Mapper<
  DomainEntity extends Entity<any>,
  persistenceDTO,
  DTO = any,
> {
  toPersistence(entity: DomainEntity): persistenceDTO;

  toDomain(record: any): DomainEntity;

  toDTO(entity: DomainEntity): DTO;
}
