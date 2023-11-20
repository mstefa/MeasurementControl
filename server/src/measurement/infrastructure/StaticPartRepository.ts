
import { PartMother } from "../../../tests/measurement/PartMother"
import { Logger } from "../../shared/infrastructure/logger/Logger";
import { Part } from "../domain/Part";
import { PartRepository } from "../domain/PartRepository";

export class StaticPartRepository implements PartRepository {

  private part: Part

  constructor() {
    this.part = PartMother.fixed()
  }

  search(name: string): Part {
    Logger.info(`Create static part <${name}>`)

    return this.part
  }
}
