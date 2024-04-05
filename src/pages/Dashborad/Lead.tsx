import {
  Box,
  Card,
  Grid,
  Button,
  // Table,
  // TableBody,
  // TableCell,
  // TableHead,
  // TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllLeads,
  fetchLeadsbyDateRange,
} from "../../services/slices/auth/leads.tsx";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../components/Header/Header.tsx";
import FilteredChat from "./filteredChat.tsx";
import dayjs, { Dayjs } from "dayjs";

const Lead = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [filTrue, setFiltTrue] = useState<boolean>(false);
  const dispatch: any = useDispatch<any>();
  const [value1, setValue1] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  const [value2, setValue2] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  const data = useSelector((state: any) => state.fetchAllLeads.data);

  useEffect(() => {
    dispatch(fetchAllLeads());
  }, [dispatch]);

  const formattedData = data.map((lead: any) => ({
    ...lead,
    createdAt: new Date(lead.createdAt).toLocaleDateString("en-GB"),
  }));

  const columns: GridColDef[] = [
    { field: "customerName", headerName: "Name", width: 280 },
    { field: "customerEmail", headerName: "Email", width: 280 },
    {
      field: "customerPhone",
      headerName: "Phone",
      width: 280,
    },
    {
      field: "createdAt",
      headerName: "Submitted At",
      width: 280,
    },
  ];

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
      fetchLeadsbyDateRange({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      })
    );
    setFiltTrue(true);
    setOpen(false);
  };

  const leadsData = useSelector(
    (state: any) => state.fetchAllLeads.leadsDateRange
  ).map((lead: any) => ({
    ...lead,
    createdAt: new Date(lead.createdAt).toLocaleDateString("en-GB"),
  }));

  //filtered chat end

  return (
    <Box sx={{ flexGrow: 1, px: 4, py: 4 }} className="p24px">
      <div className="header-flex flex justify-between items-center cs-shadow">
        <div className="heading-h2 font-bold mb-0 header-col-left leading-tight">
          Lead
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
            <Header setAuthUser={localStorage.getItem("token")} />
          </div>
        </Grid>
      </div>
      <Card
        className="cs-shadow border-0"
        sx={{
          borderColor: "grey",
          borderWidth: 1,
        }}
      >
        <Box>
          <div style={{ height: "calc(100vh - 169px)", width: "100%" }}>
            <DataGrid
              className="cs-table"
              rows={filTrue ? leadsData : formattedData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              // checkboxSelection
            />
          </div>
        </Box>
      </Card>

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

export default Lead;
