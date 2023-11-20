import { pubsub } from "../../graphql/MeasurementResolvers";
import { MeasurementControl } from "../domain/MeasurementControl";
import { MeasurementControlEventBus } from "../domain/MeasurementControlEventBust"

export class GraphQlEventBus implements MeasurementControlEventBus {

  constructor() { }

  publish(measurement: MeasurementControl): void {

    pubsub.publish('MEASUREMENT_CREATED', {
      measurement
    });
  }


}
