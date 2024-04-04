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
import React, { useEffect } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../services/slices/auth/dashboard-data.tsx";
import LineChartComponent from "./LineChartComponent.tsx";
import { fetchAllLeads } from "../../services/slices/auth/leads.tsx";
import Header from "../../components/Header/Header.tsx";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top" as const,
//     },
//     title: {
//       display: true,
//       text: "Chart.js Line Chart",
//     },
//   },
// };

const Dashboard = () => {
  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  // ];
  const dispatch: any = useDispatch<any>();
  const dashboardData = useSelector((state: any) => state.dashboardData.data);
  const notification = useSelector((state: any) => state.fetchAllLeads.data);

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: dashboardData?.map((item: any) => item.count),
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //     {
  //       label: "Dataset 2",
  //       data: dashboardData?.map((item: any) => item.count),
  //       borderColor: "rgb(53, 162, 235)",
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //     },
  //   ],
  // };
  useEffect(() => {
    dispatch(getDashboardData());
    dispatch(fetchAllLeads());
  }, [dispatch]);

  console.log("dashboardData ", dashboardData);

  return (
    <Box sx={{ flexGrow: 1, px: 4, py: 4 }} className="p24px h-screen overflow-auto">
      <div className="header-flex flex justify-between items-center cs-shadow">
        <div className="heading-h2 font-bold mb-0 header-col-left leading-tight">Dashboard</div>
        <div className="header-col-right ps-4">
          <Header />
        </div>
      </div>
      <Grid container spacing={3}>
        <Grid item lg={8} xs={12}>
          <Card
            className="p-6 cs-shadow"
            sx={{
              borderColor: "grey",
              borderWidth: 0,
            }}
          >
            {/* <Line options={options} data={data} /> */}

            <LineChartComponent chartData={dashboardData} />
          </Card>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Card
            className="py-6 h-full flex flex-col items-center cs-shadow"
            sx={{
              borderColor: "grey",
              borderWidth: 0,
            }}
          >
            <div className="text-2xl font-bold pb-6 w-full px-5">Notifications</div>
            <Divider sx={{ width: "100%" }} />
            <Table>
              <TableBody>
                {notification.map((notification, index) => (
                  <TableRow hover key={index}>
                    <TableCell>
                      <div className="p-1 heading">
                        {notification.customerEmail}
                      </div>
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
