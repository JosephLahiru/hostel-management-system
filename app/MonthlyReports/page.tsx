import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const dummyMonthlyReports = [
  {
    month: 'January 2023',
    totalDamages: 2,
    totalResolved: 1,
  },
  {
    month: 'February 2023',
    totalDamages: 15,
    totalResolved: 10,
  },
];

const dummyDailyReports = [
  {
    damaged_item_id: 1,
    damaged_item_type: 'Chair',
    room_number: '101',
    description: 'Chair leg broken',
    status: 'Pending',
  },
  {
    damaged_item_id: 2,
    damaged_item_type: 'Bulb',
    room_number: '102',
    description: 'Bulb not working',
    status: 'Resolved',
  },
];

function MonthlyReports() {
  return (
    <Paper
      sx={{
        margin: '10px',
        overflow: 'hidden',
        padding: '10px',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Monthly Report
      </Typography>
      <div>
        <Typography variant="body1">
          Month: {dummyMonthlyReports[0].month}
        </Typography>
        <Typography variant="body1">
          Total Damages: {dummyMonthlyReports[0].totalDamages}
        </Typography>
        <Typography variant="body1">
          Total Resolved: {dummyMonthlyReports[0].totalResolved}
        </Typography>
      </div>
      <hr style={{ margin: '10px 0' }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item ID</TableCell>
              <TableCell>Item Type</TableCell>
              <TableCell>Room Number</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyDailyReports.map((report, index) => (
              <TableRow key={index}>
                <TableCell>{report.damaged_item_id}</TableCell>
                <TableCell>{report.damaged_item_type}</TableCell>
                <TableCell>{report.room_number}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>{report.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default MonthlyReports;
