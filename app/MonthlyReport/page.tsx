'use client'
import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Font, PDFViewer } from '@react-pdf/renderer';

type Report = {
  complaint_id: string;
  description: string;
  item_name: string;
  status: string;
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    flexDirection: 'column',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    padding: 5,
    border: '1px solid black',
  },
  tableHeader: {
    width: '25%',
    padding: 5,
    fontWeight: 'bold',
    border: '1px solid black',
  },
});

Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' });

const MonthlyReport = () => {
  const [monthlyReport, setMonthlyReport] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMonthlyReport() {
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
        const res = await fetch(process.env.NEXT_PUBLIC_API + '/api/monthly_report', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
          },
        });

        console.log('API Response:', res);

        const data: Report[] = await res.json();

        setMonthlyReport(data);
        setLoading(false);

    
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchMonthlyReport();
  }, []);

  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.header}>Monthly Report</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableHeader}><Text>Complaint ID</Text></View>
            <View style={styles.tableHeader}><Text>Description</Text></View>
            <View style={styles.tableHeader}><Text>Item Name</Text></View>
            <View style={styles.tableHeader}><Text>Status</Text></View>
          </View>
          {monthlyReport.map((report) => (
            <View style={styles.tableRow} key={report.complaint_id}>
              <View style={styles.tableCol}><Text>{report.complaint_id}</Text></View>
              <View style={styles.tableCol}><Text>{report.description}</Text></View>
              <View style={styles.tableCol}><Text>{report.item_name}</Text></View>
              <View style={styles.tableCol}><Text>{report.status}</Text></View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
  );
};

const PDFView = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (client) {
    return (
      <PDFViewer>
        <MonthlyReport />
      </PDFViewer>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default PDFView;
