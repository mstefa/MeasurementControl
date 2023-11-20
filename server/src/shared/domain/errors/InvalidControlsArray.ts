import httpStatus from 'http-status';

import DomainError from './DomainError';

export class InvalidControlsArray extends DomainError {
  constructor(message: string) {
    super(message, httpStatus.BAD_REQUEST);
  }
}
