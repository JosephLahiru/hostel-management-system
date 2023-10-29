import React from 'react';
import Link from 'next/link';

// dummy data for Daily report
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
  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  return (
    <div>
      <h1>Daily Report - {currentDate}</h1>
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
          {dummyReports.map((report) => (
            <tr key={report.damaged_item_id}>
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

export default DailyReports;
