import { InvalidDimensionName } from '../../shared/domain/errors/InvalidDimensionName';
import { Uuid } from '../../shared/domain/value-objects/Uuid';
import { Dimension } from './Dimension';

export class PartFeature {

  constructor(
    readonly id: Uuid,
    readonly name: string,
    readonly dimensions: Dimension[]
  ) {
  }

  getDimension(dimensionName: string): Dimension {


    const dimension = this.dimensions.find(dimension => { return dimension.name === dimensionName })

    if (!dimension) {
      throw new InvalidDimensionName(`<${dimensionName}> is not a Dimension name for the feature <${this.name}>`);
    }

    return dimension

  }
}
