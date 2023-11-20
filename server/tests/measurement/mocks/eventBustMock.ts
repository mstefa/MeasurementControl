import { MeasurementControl } from "../../../src/measurement/domain/MeasurementControl";
import { MeasurementControlEventBus } from "../../../src/measurement/domain/MeasurementControlEventBust";


export class EventBusMock implements MeasurementControlEventBus {

  measurement: MeasurementControl | null;

  constructor() {
    this.measurement = null;
  }

  publish(measurement: MeasurementControl): void {

    this.measurement = measurement;
  }

  assertPublishLastCall(measurement: MeasurementControl) {
    expect(this.measurement?.partName).toStrictEqual(measurement.partName);
    expect(this.measurement?.features).toStrictEqual(measurement.features);
  }


}
