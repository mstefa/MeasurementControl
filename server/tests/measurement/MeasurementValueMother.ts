
import { Part } from "../../src/measurement/domain/Part"
import { MeasurementValue } from "../../src/measurement/dto/MeasurementValue"
import { Logger } from "../../src/shared/infrastructure/logger/Logger"

export class MeasurementValueMother {

  static fromPartRadom = (part: Part): MeasurementValue => {

    Logger.info(`Generate randomMeasure for part ${part.name}`)

    const measuredValue: MeasurementValue = {
      partName: part.name,
      features: part.features.map(feature => {
        return {
          name: feature.name,
          measures: feature.dimensions.map(dimension => {
            return {
              name: dimension.name,
              value: this.generateRandomValueWithProbabilities(dimension.value, dimension.tolerance)
            }
          }
          )
        }
      })
    }

    return measuredValue
  }

  static generateRandomValueWithProbabilities = (value: number, tolerance: number): number => {
    const randomProbability = Math.random();
    let generatedValue: number;

    if (randomProbability <= 0.9) {
      generatedValue = value + Math.random() * tolerance;
    } else if (randomProbability <= 0.95) {
      generatedValue = value + Math.random() * tolerance + value * 0.3;
    } else {
      generatedValue = value + Math.random() * tolerance + value * 0.5;
    }

    return generatedValue;
  };

  static fromPartOK = (part: Part): MeasurementValue => {

    const measuredValue: MeasurementValue = {
      partName: part.name,
      features: part.features.map(feature => {
        return {
          name: feature.name,
          measures: feature.dimensions.map(dimension => {
            return {
              name: dimension.name,
              value: (Math.random() * 0.9 - 0.5) * dimension.tolerance + dimension.value
            }
          }
          )
        }
      })
    }

    return measuredValue
  }

  static fromPartWARNING = (part: Part): MeasurementValue => {

    const measuredValue: MeasurementValue = {
      partName: part.name,
      features: part.features.map(feature => {
        return {
          name: feature.name,
          measures: feature.dimensions.map(dimension => {
            return {
              name: dimension.name,
              value: (dimension.tolerance + dimension.value) * 1.1
            }
          }
          )
        }
      })
    }

    return measuredValue
  }
}
