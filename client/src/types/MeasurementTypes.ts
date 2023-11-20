export type Part = {
  name: string
}

export type Measurement = {
  partName: string
  features: FeatureMeasurement[]
}

export type FeatureMeasurement = {
  name: string,
  status: Status
  controls: Control[]
}

export type Control = {
  name: string
  status: Status
  deviation: number
  deviationOutOfTolerance: number
}

export enum Status {
  OK = "OK",
  WARNING = "WARNING",
  ERROR = "ERROR"
}
