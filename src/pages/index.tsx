import type { NextPage } from 'next'
import { Pie } from 'react-chartjs-2'
import React, { useEffect, useState } from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import { AdminLayout } from '@layout'
import {Chart, ArcElement} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, ChartDataLabels);

interface TopComplainedItem {
  item_code: string;
  prop_name: string;
  complaint_count: number;
}

interface TopComplainedRoom {
  room_no: string;
  complaint_count: number;
}

const Home: NextPage = () => {
  const [topComplainedItemsData, setTopComplainedItemsData] = useState<TopComplainedItem[]>([]);
  const [topComplainedRoomsData, setTopComplainedRoomsData] = useState<TopComplainedRoom[]>([]);

  const fetchTopComplainedItems = async () => {
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

  const res = await fetch(process.env.NEXT_PUBLIC_API + '/api/top_complained_item', {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token,
      },
  });
    const topComplainedItems: TopComplainedItem[] = await res.json();
    console.log(topComplainedItems);
    return topComplainedItems;
  };

  const fetchTopComplainedRooms = async () => {
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

  const res = await fetch(process.env.NEXT_PUBLIC_API + '/api/top_complained_rooms', {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token,
      },
  });
    const topComplainedRooms: TopComplainedRoom[] = await res.json();
    console.log(topComplainedRooms);
    return topComplainedRooms;
  };

  useEffect(() => {
    fetchTopComplainedItems().then(data => setTopComplainedItemsData(data));
    fetchTopComplainedRooms().then(data => setTopComplainedRoomsData(data));
  }, []);


  const topComplainedItemsChartData = {
    labels: topComplainedItemsData.map(item => `${item.item_code}\n${item.prop_name}\n${item.complaint_count} complaints`),
    datasets: [
     {
       label: 'Top Complained Items',
       data: topComplainedItemsData.map(item => item.complaint_count),
       backgroundColor: [
         'rgba(255, 99, 132, 0.2)',
         'rgba(54, 162, 235, 0.2)',
         'rgba(255, 206, 86, 0.2)',
       ],
     },
    ],
   };
 
   const topComplainedItemsChartOptions = {
    plugins: {
      datalabels: {
        color: '#000',
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
            sum += data;
          });
          let percentage = (value*100 / sum).toFixed(2)+"%";
          let label = ctx.chart.data.labels[ctx.dataIndex];
          return `${label}\n${percentage}`;
        },
        font: {
          size: 16, 
        },
      },
    },
   };
 
  const topComplainedRoomsChartData = {
    labels: topComplainedRoomsData.map(room => `Room ${room.room_no}\n${room.complaint_count} complaints`),
    datasets: [
     {
       label: 'Top Complained Rooms',
       data: topComplainedRoomsData.map(room => room.complaint_count),
       backgroundColor: [
         'rgba(75, 192, 192, 0.2)',
         'rgba(153, 102, 255, 0.2)',
         'rgba(255, 159, 64, 0.2)',
       ],
     },
    ],
   };
 
   const topComplainedRoomsChartOptions = {
    plugins: {
      datalabels: {
        color: '#000',
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
            sum += data;
          });
          let percentage = (value*100 / sum).toFixed(2)+"%";
          let label = ctx.chart.data.labels[ctx.dataIndex];
          return `${label}\n${percentage}`;
        },
        font: {
          size: 16, // changed from '16' to 16
        },
      },
    },
   };
   
  return (
    <AdminLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Typography variant="h6" component="div" sx={{ p: 2 }}>
              Top Complained Items
            </Typography>
            <Pie data={topComplainedItemsChartData} options={topComplainedItemsChartOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Typography variant="h6" component="div" sx={{ p: 2 }}>
              Top Complained Rooms
            </Typography>
            <Pie data={topComplainedRoomsChartData} options={topComplainedRoomsChartOptions} />
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );   
};

export default Home;
