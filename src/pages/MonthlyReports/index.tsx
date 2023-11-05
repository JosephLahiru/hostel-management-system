"use client";
import React, { useState, useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import {AdminLayout} from "@layout";

type Report = {
  complaint_id: string;
  complaint_created_date: string;
  item_name: string;
  description: string;
  hostel_type: string;
  room_no: string;
  stu_no: string;
  student_name: string;
  status: string;
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    flexDirection: "column",
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "100%",
  },
  tableText: {
    fontSize: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    padding: 5,
    border: "1px solid black",
  },
  tableHeader: {
    width: "25%",
    padding: 5,
    fontWeight: "bold",
    border: "1px solid black",
    backgroundColor: "lightgrey",
    fontSize: 12,
  },
});

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const MonthlyReport = () => {
  const [monthlyReport, setMonthlyReport] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMonthlyReport() {
      try {
        const authRes = await fetch(
            process.env.NEXT_PUBLIC_API + "/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: process.env.NEXT_PUBLIC_USERNAME,
                password: process.env.NEXT_PUBLIC_PASSWORD,
              }),
            }
        );

        const authData = await authRes.json();

        const token = authData.jwt;
        // Fetch daily report data and set it in the state
        const res = await fetch(
            process.env.NEXT_PUBLIC_API + "/api/monthly_report",
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + token,
              },
            }
        );

        console.log("API Response:", res);

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
            <Text style={styles.header}>
              {monthlyReport.length > 0 &&
                  `Monthly Report - ${new Date(
                      monthlyReport[0].complaint_created_date
                  ).toLocaleString("default", { month: "long", year: "numeric" })}`}
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableHeader}>
                  <Text>Complaint ID</Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text>Date</Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text>Description</Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text>Item Name</Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text>Hostel Type</Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text>Room No</Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text>Student No</Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text>Student Name</Text>
                </View>
                <View style={styles.tableHeader}>
                  <Text>Status</Text>
                </View>
              </View>
              {monthlyReport.map((report) => (
                  <View
                      style={{
                        ...styles.tableRow,
                        backgroundColor:
                            report.status === "pending" ? "pink" : "white",
                      }}
                      key={report.complaint_id}
                  >
                    <View style={styles.tableCol}>
                      <Text style={styles.tableText}>{report.complaint_id}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableText}>
                        {
                          new Date(report.complaint_created_date)
                              .toISOString()
                              .split("T")[0]
                        }
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableText}>{report.description}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableText}>{report.item_name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableText}>{report.hostel_type}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableText}>{report.room_no}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableText}>{report.stu_no}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableText}>{report.student_name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableText}>{report.status}</Text>
                    </View>
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
        <AdminLayout>
          <PDFViewer style={{ width: "100%", height: "100vh" }}>
            <MonthlyReport />
          </PDFViewer>
        </AdminLayout>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default PDFView;