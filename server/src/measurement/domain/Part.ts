import { InvalidFeatureName } from '../../shared/domain/errors/InvalidFeatureName';
import { Uuid } from '../../shared/domain/value-objects/Uuid';
import { PartFeature } from './PartFeature';

export class Part {

  constructor(
    readonly id: Uuid,
    readonly name: string,
    readonly features: PartFeature[]
  ) {
  }

  getFeature(featuresName: string): PartFeature {
    const feature = this.features.find((feature) => { return feature.name === featuresName })

    if (!feature) {
      throw new InvalidFeatureName(`<${featuresName}> is not a Feature name in the part <${this.name}>`);
    }

    return feature

  }

}
