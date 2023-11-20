import { MeasurementControl } from "./MeasurementControl";

export interface MeasurementControlEventBus {
  publish(measurementControl: MeasurementControl): void
}
