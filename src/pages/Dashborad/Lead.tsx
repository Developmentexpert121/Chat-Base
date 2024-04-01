import {
  Box,
  Card,
  // Table,
  // TableBody,
  // TableCell,
  // TableHead,
  // TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLeads } from "../../services/slices/auth/leads.tsx";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// const lead = [
//   {
//     name: "Johnny",
//     email: "john@gmail.com",
//     phone: "214567890",
//     submittedAt: "2001",
//   },
//   {
//     name: "HHage",
//     email: "HHage@gmail.com",
//     phone: "12345214",
//     submittedAt: "2001",
//   },
//   {
//     name: "Hkarrsv",
//     email: "Hkarrsv@gmail.com",
//     phone: "1347167890",
//     submittedAt: "2001",
//   },
//   {
//     name: "Luagsf",
//     email: "Luagsf@gmail.com",
//     phone: "34674325",
//     submittedAt: "2001",
//   },
// ];

const Lead = () => {
  const dispatch: any = useDispatch();
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

  return (
    <Box sx={{ flexGrow: 1, px: 8, py: 1 }}>
      <div className="text-5xl text-white font-bold mb-6">Lead</div>

      <Card
        sx={{
          boxShadow: 2,
          borderColor: "grey",
          borderWidth: 1,
        }}
      >
        <Box>
          {/* <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell className="heading">Name</TableCell>
                <TableCell className="heading">Email</TableCell>
                <TableCell className="heading">Phone</TableCell>
                <TableCell className="heading">
                  Submitted At <ArrowDropUpIcon className="rotate-180" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((order: any, index: any) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell
                      sx={{ borderBottom: index === lead.length - 1 ? 0 : "" }}
                    >
                      {order.customerName}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: index === lead.length - 1 ? 0 : "" }}
                    >
                      {order.customerEmail}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: index === lead.length - 1 ? 0 : "" }}
                    >
                      {order.customerPhone}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: index === lead.length - 1 ? 0 : "" }}
                    >
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table> */}
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={formattedData}
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
    </Box>
  );
};

export default Lead;
