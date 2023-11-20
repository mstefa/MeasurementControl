//let useCase: UseCase;

import { ReadMeasurement } from "../../src/measurement/aplication/ReadMeasurement";
import { Control } from "../../src/measurement/domain/Control";
import { ControlStatus } from "../../src/measurement/domain/ControlStatus";
import { FeatureControl } from "../../src/measurement/domain/FeatureControl";
import { MeasurementControl } from "../../src/measurement/domain/MeasurementControl";
import { Uuid } from "../../src/shared/domain/value-objects/Uuid";
import { MeasurementValueMother } from "./MeasurementValueMother";
import { EventBusMock } from "./mocks/eventBustMock";
import { PartRepositoryMock } from "./mocks/PartRepositoryMock";
import { PartMother } from "./PartMother";

let partRepository: PartRepositoryMock;
let eventBus: EventBusMock;
let readMeasurement: ReadMeasurement;

beforeEach(() => {

  partRepository = new PartRepositoryMock();
  eventBus = new EventBusMock;
  readMeasurement = new ReadMeasurement(partRepository, eventBus)

});

describe('Read Measurement', () => {
  it('should return a complete "Ok" part', async () => {

    const mockedPart = PartMother.random(1, 1);
    partRepository.setMockedPart(mockedPart);


    const measure = MeasurementValueMother.fromPartOK(mockedPart);

    const dev1 = measure.features[0].measures[0].value - mockedPart.features[0].dimensions[0].value;

    const controlExpected1 = new Control(
      mockedPart.features[0].dimensions[0].name,
      ControlStatus.OK,
      dev1,
      0
    )

    const featureExpected = new FeatureControl(
      mockedPart.features[0].name,
      [controlExpected1]
    )

    const expected = new MeasurementControl(Uuid.random(), mockedPart.name, [featureExpected])

    await readMeasurement.run(measure)

    eventBus.assertPublishLastCall(expected)

  })


  it('should return a complete "Ok" part with two dimensions', async () => {

    const mockedPart = PartMother.random(1, 2);
    partRepository.setMockedPart(mockedPart);


    console.log('mockedPart1')
    console.log(mockedPart.features[0].dimensions[0].value)
    console.log(mockedPart.features[0].dimensions[0].tolerance)
    console.log('mockedPart2')
    console.log(mockedPart.features[0])
    console.log(mockedPart.features[0].dimensions[1].value)
    console.log(mockedPart.features[0].dimensions[1].tolerance)

    const measure = MeasurementValueMother.fromPartOK(mockedPart);

    const dev1 = measure.features[0].measures[0].value - mockedPart.features[0].dimensions[0].value;
    const dev2 = measure.features[0].measures[1].value - mockedPart.features[0].dimensions[1].value;

    console.log('dev1')
    console.log(dev1)

    console.log('dev2')
    console.log(dev2)

    const controlExpected1 = new Control(
      mockedPart.features[0].dimensions[0].name,
      ControlStatus.OK,
      dev1,
      0
    )
    const controlExpected2 = new Control(
      mockedPart.features[0].dimensions[1].name,
      ControlStatus.OK,
      dev2,
      0
    )

    const featureExpected = new FeatureControl(
      mockedPart.features[0].name,
      [controlExpected1, controlExpected2]
    )

    const expected = new MeasurementControl(Uuid.random(), mockedPart.name, [featureExpected])

    await readMeasurement.run(measure)

    eventBus.assertPublishLastCall(expected)

  })

  it('should return a complete "WARNING" part', async () => {

    const mockedPart = PartMother.random(1, 1);
    partRepository.setMockedPart(mockedPart);

    const measure = MeasurementValueMother.fromPartWARNING(mockedPart);

    const dev = measure.features[0].measures[0].value - mockedPart.features[0].dimensions[0].value;
    const devOutOfTolerance = measure.features[0].measures[0].value - (mockedPart.features[0].dimensions[0].value + mockedPart.features[0].dimensions[0].tolerance);

    const controlExpected = new Control(
      mockedPart.features[0].dimensions[0].name,
      ControlStatus.WARNING,
      dev,
      devOutOfTolerance
    )

    const featureExpected = new FeatureControl(
      mockedPart.features[0].name,
      [controlExpected]
    )

    const expected = new MeasurementControl(Uuid.random(), mockedPart.name, [featureExpected])

    await readMeasurement.run(measure)

    eventBus.assertPublishLastCall(expected)

  })

})
