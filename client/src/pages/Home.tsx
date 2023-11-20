import { useSubscription } from '@apollo/client';
import { Measurement } from '../types/MeasurementTypes';
import { Feature } from '../components/Feature';
import { CircularProgress, Grid } from '@mui/material';
import { MEASUREMENT_SUBSCRIPTION } from '../repository/MeasurementGraphQlRepository';
import { useState } from 'react';

export function Home() {
  const [measurement, setMeasurement] = useState<Measurement>();

  useSubscription(MEASUREMENT_SUBSCRIPTION, {
    onData: (subscriptionData) => {
      setMeasurement(subscriptionData.data.data.measurement);
    },
  });

  const features = measurement?.features;

  return (
    <>
      <h1>Part Name: {measurement ? measurement.partName : 'loading... '}</h1>

      {!features ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2}>
          {features.map((feature) => {
            return <Feature {...feature}></Feature>;
          })}
        </Grid>
      )}
    </>
  );
}
