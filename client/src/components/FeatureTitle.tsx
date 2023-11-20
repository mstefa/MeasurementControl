import { Typography } from '@mui/material';
import React from 'react';
import { Status } from '../types/MeasurementTypes';

// Component
interface FeatureTitleProps {
  title: string;
  status: Status;
}

const FeatureTitle: React.FC<FeatureTitleProps> = ({ title, status }) => {
  let backgroundColor: string;

  switch (status) {
    case 'OK':
      backgroundColor = 'green';
      break;
    case 'WARNING':
      backgroundColor = 'orange';
      break;
    case 'ERROR':
      backgroundColor = 'red';
      break;
    default:
      backgroundColor = 'red';
  }

  return (
    <Typography variant="h4" style={{ backgroundColor }}>
      {title}
    </Typography>
  );
};

export default FeatureTitle;
