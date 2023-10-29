import React from 'react';
import Link from 'next/link';

// dummy data for monthly report
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
    <div>
      <h1>Monthly Report</h1>

      
      <div>
        <p>Month: {dummyMonthlyReports[0].month}</p>
        <p>Total Damages: {dummyMonthlyReports[0].totalDamages}</p>
        <p>Total Resolved: {dummyMonthlyReports[0].totalResolved}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Type</th>
            <th>Room Number</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyDailyReports.map((report, index) => (
            <tr key={index}>
              <td>{report.damaged_item_id}</td>
              <td>{report.damaged_item_type}</td>
              <td>{report.room_number}</td>
              <td>{report.description}</td>
              <td>{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonthlyReports;
