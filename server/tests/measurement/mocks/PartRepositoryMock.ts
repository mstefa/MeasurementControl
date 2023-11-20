import { Part } from "../../../src/measurement/domain/Part"
import { PartRepository } from "../../../src/measurement/domain/PartRepository"
import { Logger } from "../../../src/shared/infrastructure/logger/Logger"
import { PartMother } from "../PartMother"

export class PartRepositoryMock implements PartRepository {

  private part: Part

  constructor() {
    this.part = PartMother.fixed()
  }

  search(name: string): Part {
    Logger.info(name)

    return this.part
  }

  setMockedPart(part: Part) {
    this.part = part;
  }
}
