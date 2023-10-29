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


const columns = [
  { field: 'damaged_item_id', headerName: 'Item ID' },
  { field: 'damaged_item_type', headerName: 'Item Type' },
  { field: 'room_number', headerName: 'Room Number' },
  { field: 'description', headerName: 'Description' },
  { field: 'status', headerName: 'Status' },
];

const dummyReports = [
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

function DailyReports() {
  return (
    <Paper
      sx={{
        margin: "10px",
        overflow: "hidden",
        padding: "10px",
      }}
    >
      <Typography variant="h5" gutterBottom>
          Daily Report
        </Typography>
        <hr style={{ margin: "10px 0" }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyReports.map((report) => (
              <TableRow key={report.damaged_item_id}>
                {columns.map((column) => (
                  <TableCell key={column.field}>{report[column.field as keyof typeof report]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default DailyReports;