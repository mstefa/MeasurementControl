import { faker } from "@faker-js/faker";

import { Dimension } from "../../src/measurement/domain/Dimension"
import { Part } from "../../src/measurement/domain/Part";
import { PartFeature } from "../../src/measurement/domain/PartFeature";
import { Uuid } from "../../src/shared/domain/value-objects/Uuid";

export class PartMother {

  static fixed = (): Part => {

    const dimension1 = new Dimension(Uuid.random(), 'diameter', Math.random() * 100, Math.random() * 0.5);
    const dimension2 = new Dimension(Uuid.random(), 'lengthX', Math.random() * 100, Math.random() * 0.5);
    const dimension3 = new Dimension(Uuid.random(), 'lengthY', Math.random() * 100, Math.random() * 0.5);
    const dimension4 = new Dimension(Uuid.random(), 'lengthZ', Math.random() * 100, Math.random() * 0.5);
    const dimension5 = new Dimension(Uuid.random(), 'positionX', Math.random() * 100, Math.random() * 0.5);
    const dimension6 = new Dimension(Uuid.random(), 'positionY', Math.random() * 100, Math.random() * 0.5);
    const dimension7 = new Dimension(Uuid.random(), 'positionZ', Math.random() * 100, Math.random() * 0.5);
    const dimension8 = new Dimension(Uuid.random(), 'position1', Math.random() * 100, Math.random() * 0.5);
    const dimension9 = new Dimension(Uuid.random(), 'position2', Math.random() * 100, Math.random() * 0.5);
    const dimension10 = new Dimension(Uuid.random(), 'position3', Math.random() * 100, Math.random() * 0.5);


    const feature1 = new PartFeature(Uuid.random(), 'seal', [dimension1, dimension2, dimension3, dimension4, dimension5, dimension6, dimension7, dimension8, dimension9, dimension10])
    const feature2 = new PartFeature(Uuid.random(), 'hole', [dimension1, dimension2, dimension3, dimension4,])
    const feature3 = new PartFeature(Uuid.random(), 'Lock', [dimension5, dimension6, dimension7, dimension8, dimension9])
    const feature4 = new PartFeature(Uuid.random(), 'panel', [dimension6, dimension7, dimension8, dimension9, dimension10])

    const part = new Part(Uuid.random(), 'door', [feature1, feature2, feature3, feature4])
    // const part = new Part(Uuid.random(), 'door', [feature2])


    return part
  }

  static random = (numFeatures: number, numDimensions: number): Part => {

    const randomFeatures: PartFeature[] = [];

    for (let i = 0; i < numFeatures; i++) {
      randomFeatures.push(this.generateRandomFeature(numDimensions));
    }

    const part = new Part(Uuid.random(), 'door', randomFeatures)

    return part
  }

  static generateRandomDimension = (): Dimension => {
    const randomId = Uuid.random();
    const randomType = 'length'; // Assuming 'length' as the type
    const randomValue = 1 //faker.number.float({ min: 10, max: 100, precision: 0.001 });
    const randomTolerance = 0.1;

    return new Dimension(randomId, randomType, randomValue, randomTolerance);
  };

  static generateRandomFeature = (numDimensions: number): PartFeature => {
    const randomId = Uuid.random();
    const randomName = faker.commerce.product(); // Generate a random product name using faker
    const randomDimensions: Dimension[] = [];

    // Generate a random number of dimensions (between 1 and 5 for example)

    for (let i = 0; i < numDimensions; i++) {
      randomDimensions.push(this.generateRandomDimension());
    }

    return new PartFeature(randomId, randomName, randomDimensions);
  };

}
