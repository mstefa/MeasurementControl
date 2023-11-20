import { InvalidControlsArray } from "../../shared/domain/errors/InvalidControlsArray";
import { Control } from "./Control";
import { ControlStatus } from "./ControlStatus";

export class FeatureControl {
  readonly name: string;
  readonly controls: Control[];
  readonly status: ControlStatus;

  constructor(
    name: string,
    controls: Control[]
  ) {
    this.name = name;
    this.controls = controls;
    this.status = this.calculateStatus(controls)
  }

  private calculateStatus(controls: Control[]) {

    if (controls.length === 0) {
      throw new InvalidControlsArray(`Feature Controls should have one o more measurement controls`)
    }

    let worstStatus = ControlStatus.OK;

    for (const control of controls) {
      switch (control.status) {
        case ControlStatus.ERROR:
          return ControlStatus.ERROR;
        case ControlStatus.WARNING:
          worstStatus = ControlStatus.WARNING;
          break;
        default:
          break;
      }
    }

    return worstStatus;
  }


}

