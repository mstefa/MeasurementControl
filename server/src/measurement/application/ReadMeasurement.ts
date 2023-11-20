import { Uuid } from "../../shared/domain/value-objects/Uuid";
import { Logger } from "../../shared/infrastructure/logger/Logger";
import { FeatureControl } from "../domain/FeatureControl";
import { MeasurementControl } from "../domain/MeasurementControl";
import { MeasurementControlEventBus } from "../domain/MeasurementControlEventBust";
import { Part } from "../domain/Part";
import { PartRepository } from "../domain/PartRepository";
import { MeasurementValue } from "../dto/MeasurementValue";

export class ReadMeasurement {

  constructor(
    private partRepository: PartRepository,
    private eventBus: MeasurementControlEventBus
  ) {
  }

  async run(measurement: MeasurementValue): Promise<void> {

    Logger.info(JSON.stringify(measurement))

    const part = this.partRepository.search(measurement.partName)
    Logger.info(part.name)

    const measurementControl = this.controlMeasurement(part, measurement)

    this.eventBus.publish(measurementControl)


  }

  private controlMeasurement(part: Part, measuredValue: MeasurementValue) {
    const featuresControls = measuredValue.features.map(measuredFeature => {
      const partFeature = part.getFeature(measuredFeature.name);
      const controls = measuredFeature.measures.map(measure => {
        const dimension = partFeature.getDimension(measure.name);

        return dimension.compareMeasurement(measure.value);
      })

      return new FeatureControl(measuredFeature.name, controls)

    })

    return new MeasurementControl(Uuid.random(), part.name, featuresControls)
  }
}
