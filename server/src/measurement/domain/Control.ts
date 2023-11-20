import { ControlStatus } from "./ControlStatus";

export class Control {

  constructor(
    readonly name: string,
    readonly status: ControlStatus,
    readonly deviation: number,
    readonly deviationOutOfTolerance: number,
  ) {
  }

}
