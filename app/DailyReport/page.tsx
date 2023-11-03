'use client'
import { useState, useEffect, use } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Typography,
  Box,
} from '@mui/material';

type Report = {
  complaint_id: string;
  description: string;
  image_url: string;
  item_code: string;
  item_name: string;
  room_no: string;
  hostel_type: string;
  stu_no: string;
  student_name: string;
  status: string;
  complaint_created_date: string;
};

function DailyReport() {
  const [dailyReport, setDailyReport] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDailyReport() {
      try {
        const authRes = await fetch(process.env.NEXT_PUBLIC_API + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: process.env.NEXT_PUBLIC_USERNAME,
          password: process.env.NEXT_PUBLIC_PASSWORD,
        }),
      });
  
      const authData = await authRes.json();

      const token = authData.jwt;
        // Fetch daily report data and set it in the state
        const res = await fetch(process.env.NEXT_PUBLIC_API + '/api/daily_report', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
          },
        });

        const data: Report[] = await res.json();

        setDailyReport(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDailyReport();
  }, []);

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <Typography variant="h3" gutterBottom style={{ padding: "20px 0 20px 0" }}>
        Daily Report
      </Typography>
      <hr />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>complaint_id</b></TableCell>
              <TableCell><b>description</b></TableCell>
              <TableCell><b>image_url</b></TableCell>
              <TableCell><b>item_code</b></TableCell>
              <TableCell><b>item_name</b></TableCell>
              <TableCell><b>room_no</b></TableCell>
              <TableCell><b>hostel_type</b></TableCell>
              <TableCell><b>stu_no</b></TableCell>
              <TableCell><b>student_name</b></TableCell>
              <TableCell><b>status</b></TableCell>
              <TableCell><b>complaint_created_date</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array(10).fill(null).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                </TableRow>
              ))
            ) : (
              dailyReport.map((report) => (
                <TableRow key={report.complaint_id}>
                  <TableCell>{report.complaint_id}</TableCell>
                  <TableCell>{report.description}</TableCell>
                  <TableCell>{report.image_url}</TableCell>
                  <TableCell>{report.item_code}</TableCell>
                  <TableCell>{report.item_name}</TableCell>
                  <TableCell>{report.room_no}</TableCell>
                  <TableCell>{report.hostel_type}</TableCell>
                  <TableCell>{report.stu_no}</TableCell>
                  <TableCell>{report.student_name}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>{report.complaint_created_date}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DailyReport;
