export type AggregateID = string;
export type version = number;

export interface CreateEntityProps<T> {
  props: T;
  id?: AggregateID;
  version: number;
}

export abstract class Entity<EntityProps> {
  constructor({ props, id, version }: CreateEntityProps<EntityProps>) {
    this.setId(id);
    this.setVersion(version);
    this._props = props;
    this.validate();
  }

  protected readonly _props: EntityProps;

  protected abstract _id: AggregateID;
  protected abstract _version?: number;

  get id(): AggregateID {
    return this._id;
  }

  get version(): version {
    return this._version;
  }

  private setId(id: AggregateID): void {
    this._id = id;
  }

  private setVersion(version: version): void {
    this._version = version;
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  public equals(object?: Entity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id === object.id : false;
  }

  get props(): EntityProps {
    const propsCopy = {
      id: this._id,
      ...this._props,
    };
    return Object.freeze(propsCopy);
  }

  public abstract validate(): void;
}
