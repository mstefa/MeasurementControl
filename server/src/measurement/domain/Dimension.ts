import { Uuid } from '../../shared/domain/value-objects/Uuid';
import { Logger } from '../../shared/infrastructure/logger/Logger';
import { Control } from './Control';
import { ControlStatus } from './ControlStatus';

export class Dimension {

  constructor(
    readonly id: Uuid,
    readonly name: string,
    readonly value: number,
    readonly tolerance: number
  ) {
  }

  compareMeasurement(measurementValue: number) {

    Logger.info(
      `comparing ${this.name}, valued received: ${measurementValue}. Expected Value${this.value} +/- ${this.tolerance} `
    )
    const deviation = measurementValue - this.value
    let status: ControlStatus = ControlStatus.OK;
    let deviationOutOfTolerance = 0;

    if (Math.abs(deviation) < this.tolerance) {
      Logger.info(
        `Comparative end with status ${status}`
      )

      return new Control(this.name, status, deviation, deviationOutOfTolerance)
    }

    let comparatorValue: number = 0;

    if (deviation > 0) {
      comparatorValue = this.value + this.tolerance

    }

    if (deviation < 0) {
      comparatorValue = this.value - this.tolerance
    }

    deviationOutOfTolerance = measurementValue - comparatorValue
    if (Math.abs(deviationOutOfTolerance) < 0.3 * comparatorValue) {
      status = ControlStatus.WARNING
    } else if (Math.abs(deviationOutOfTolerance) > 0.3 * comparatorValue) {
      status = ControlStatus.ERROR
    }

    Logger.info(
      `Comparative end with status ${status}`
    )

    return new Control(this.name, status, deviation, deviationOutOfTolerance)

  }


}
