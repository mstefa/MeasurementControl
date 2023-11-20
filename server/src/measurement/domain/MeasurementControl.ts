import { Uuid } from "../../shared/domain/value-objects/Uuid";
import { FeatureControl } from "./FeatureControl";

export class MeasurementControl {

  constructor(
    readonly id: Uuid,
    readonly partName: string,
    readonly features: FeatureControl[]
  ) {
  }

}
