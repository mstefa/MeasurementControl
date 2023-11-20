import {
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { FeatureMeasurement } from '../types/MeasurementTypes';
import FeatureTitle from './FeatureTitle';
import StatusIcon from './StatusIcon';
import MeasurementNumber from './MasurementNumber';

export function Feature(feature: FeatureMeasurement) {
  return (
    <Grid item xs={12} md={8} lg={4}>
      <Card>
        <FeatureTitle
          title={feature.name}
          status={feature.status}
        ></FeatureTitle>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Dev</b>
              </TableCell>
              <TableCell>
                <b>Dev out Of Tol</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feature.controls.map((control) => (
              <TableRow key={control.name}>
                <TableCell>{control.name}</TableCell>
                <TableCell>
                  <MeasurementNumber value={control.deviation} />
                </TableCell>
                <TableCell>
                  <MeasurementNumber value={control.deviationOutOfTolerance} />
                </TableCell>
                <TableCell>
                  <StatusIcon status={control.status} colored={true} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Grid>
  );
}
