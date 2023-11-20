import gql from "graphql-tag";

export const typeDefs = gql`
  type Query{
    getParts: Part
  }

  type Subscription {
      measurement: Measurement
    }

  type Part {
    name: String
  }

  type Measurement {
    partName: String
    features: [FeatureMeasurement!]!
  }

  type FeatureMeasurement {
    name: String
    status: Status
    controls: [Control]!
  }

  type Control {
    name: String
    status: Status
    deviation: Float
    deviationOutOfTolerance: Float
  }

  enum Status {
  OK
  WARNING
  ERROR
}

`;
