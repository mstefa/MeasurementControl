import React from 'react';
import { CheckCircleOutline, Warning, Error } from '@mui/icons-material';

interface StatusIconProps {
  status: 'OK' | 'WARNING' | 'ERROR';
  colored: boolean;
}

const StatusIcon: React.FC<StatusIconProps> = ({ status, colored }) => {
  const iconColor = 'white';
  const getIcon = () => {
    switch (status) {
      case 'OK':
        return (
          <CheckCircleOutline sx={{ color: colored ? 'green' : iconColor }} />
        );
      case 'WARNING':
        return <Warning sx={{ color: colored ? 'orange' : iconColor }} />;
      case 'ERROR':
        return <Error sx={{ color: colored ? 'red' : iconColor }} />;
      default:
        return null;
    }
  };

  return getIcon();
};

export default StatusIcon;
