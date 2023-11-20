export type Measure = {
  name: string
  value: number
}

export type FeatureMeasured = {
  name: string,
  measures: Measure[]
}

export type MeasurementValue = {
  partName: string
  features: FeatureMeasured[]
}
