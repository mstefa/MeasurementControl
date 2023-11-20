import React from 'react';

// Component
interface MeasurementNumberProps {
  value: number;
}

const MeasurementNumber: React.FC<MeasurementNumberProps> = ({ value }) => {
  // Format the number to 3 digits
  const formattedValue = value.toFixed(3);

  // Add the termination "mm" to the formatted number
  const measurementString = `${formattedValue} mm`;

  return <span>{measurementString}</span>;
};

export default MeasurementNumber;
