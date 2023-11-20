import httpStatus from 'http-status';

import DomainError from './DomainError';

export class InvalidDimensionName extends DomainError {
  constructor(message: string) {
    super(message, httpStatus.NOT_FOUND);
  }
}
