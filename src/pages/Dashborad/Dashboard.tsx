import {
  Box,
  Card,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./styles.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [1, 2, 3, 7, 9, 4],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [1, 3, 8, 3, 9, 2],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const notification = [
  {
    noti: "Notification 1",
  },
  {
    noti: "Notification 2",
  },
  {
    noti: "Notification 3",
  },
];

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, px: 8, py: 1 }}>
      <div className="text-5xl font-bold mb-6">Dashboard</div>
      <Grid container spacing={3}>
        <Grid item lg={8}>
          <Card
            className="p-6"
            sx={{
              boxShadow: 2,
              borderColor: "grey",
              borderWidth: 1,
            }}
          >
            <Line options={options} data={data} />
          </Card>
        </Grid>
        <Grid item lg={4}>
          <Card
            className="py-6 h-full flex flex-col items-center"
            sx={{
              boxShadow: 2,
              borderColor: "grey",
              borderWidth: 1,
            }}
          >
            <div className="text-2xl font-bold pb-6 ">Notifications</div>
            <Divider sx={{ width: "100%" }} />
            <Table>
              <TableBody>
                {notification.map((notification, index) => (
                  <TableRow hover key={index}>
                    <TableCell>
                      <div className="p-1 heading">{notification.noti}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
