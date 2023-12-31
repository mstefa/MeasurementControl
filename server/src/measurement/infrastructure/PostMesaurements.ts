import { MeasurementValueMother } from "../../../tests/measurement/MeasurementValueMother"
import { ReadMeasurement } from "../application/ReadMeasurement";
import { Part } from "../domain/Part";

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => { setTimeout(resolve, ms) });
}


export class PostMeasurement {

  constructor(
    private part: Part,
    private readMeasurement: ReadMeasurement
  ) { }

  async run(): Promise<void> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await delay(10000); // Wait for 10second
      const measuredValue = MeasurementValueMother.fromPartRadom(this.part)
      this.readMeasurement.run(measuredValue)
      // eslint-disable-next-line no-await-in-loop
    }



  }
}
