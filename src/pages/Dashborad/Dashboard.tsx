import {
  Box,
  Card,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardData,
  getDashboardDatabyDateRange,
} from "../../services/slices/auth/dashboard-data.tsx";
import LineChartComponent from "./LineChartComponent.tsx";
import { fetchAllLeads } from "../../services/slices/auth/leads.tsx";
import Header from "../../components/Header/Header.tsx";
import dayjs, { Dayjs } from "dayjs";
import FilteredChat from "./filteredChat.tsx";

const Dashboard = () => {
  const dispatch: any = useDispatch<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [value1, setValue1] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  const [value2, setValue2] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  const dashboardData = useSelector((state: any) => state.dashboardData.data);
  const notification = useSelector((state: any) => state.fetchAllLeads.data);

  useEffect(() => {
    dispatch(getDashboardData());
    dispatch(fetchAllLeads());
  }, [dispatch]);

  //filtered chat

  const filteredChatData = () => {
    const startDate = value1 ? value1.toDate() : null;
    const endDate = value2 ? value2.toDate() : null;

    const year1 = startDate ? startDate.getFullYear() : null;
    const month1 = startDate
      ? (startDate.getMonth() + 1).toString().padStart(2, "0")
      : null;
    const day1 = startDate
      ? startDate.getDate().toString().padStart(2, "0")
      : null;

    const year2 = endDate ? endDate.getFullYear() : null;
    const month2 = endDate
      ? (endDate.getMonth() + 1).toString().padStart(2, "0")
      : null;
    const day2 = endDate ? endDate.getDate().toString().padStart(2, "0") : null;

    // Construct the formatted date string in the format 'YYYY-MM-DD'
    const formattedStartDate = `${year1}-${month1}-${day1}`;
    const formattedEndDate = `${year2}-${month2}-${day2}`;

    dispatch(
      getDashboardDatabyDateRange({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      })
    );
    setOpen(false);
  };

  //filtered chat end

  return (
    <Box
      sx={{ flexGrow: 1, px: 4, py: 4 }}
      className="p24px h-screen overflow-auto"
    >
      <div className="header-flex flex justify-between items-center cs-shadow">
        <div className="heading-h2 font-bold mb-0 header-col-left leading-tight">
          Dashboard
        </div>
        <Grid
          item
          xs={6}
          sx={{ display: "flex", justifyContent: "flex-end" }}
          className="header-col-right"
        >
          <Button
            variant="outlined"
            className="btn-primary"
            onClick={() => setOpen(true)}
            sx={{ color: "grey", borderColor: "1px solid black" }}
          >
            Pick Date
          </Button>
          <div className="header-col-right ps-4">
            <Header />
          </div>
        </Grid>
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
            <div className="text-2xl font-bold pb-6 w-full px-5">
              Notifications
            </div>
            <Divider sx={{ width: "100%" }} />
            <Table>
              <TableBody>
                {notification.map((notification: any, index: any) => (
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

      <FilteredChat
        open={open}
        setOpen={setOpen}
        value1={value1}
        setValue1={setValue1}
        value2={value2}
        setValue2={setValue2}
        filteredChatData={filteredChatData}
      />
    </Box>
  );
};

export default Dashboard;
