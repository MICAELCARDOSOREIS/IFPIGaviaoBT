export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends DomainError {}
export class DataSourceError extends DomainError {}
export class NotFoundError extends DomainError {}
