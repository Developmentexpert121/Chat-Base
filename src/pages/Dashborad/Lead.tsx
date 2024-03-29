import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import "./styles.css";

const lead = [
  {
    name: "Johnny",
    email: "john@gmail.com",
    phone: "214567890",
    submittedAt: "2001",
  },
  {
    name: "HHage",
    email: "HHage@gmail.com",
    phone: "12345214",
    submittedAt: "2001",
  },
  {
    name: "Hkarrsv",
    email: "Hkarrsv@gmail.com",
    phone: "1347167890",
    submittedAt: "2001",
  },
  {
    name: "Luagsf",
    email: "Luagsf@gmail.com",
    phone: "34674325",
    submittedAt: "2001",
  },
];
const Lead = () => {
  return (
    <Box sx={{ flexGrow: 1, px: 8, py: 1 }}>
      <div className="text-5xl font-bold mb-6">Lead</div>

      <Card
        sx={{
          boxShadow: 2,
          borderColor: "grey",
          borderWidth: 1,
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell className="heading">Name</TableCell>
                <TableCell className="heading">Email</TableCell>
                <TableCell className="heading">Phone</TableCell>
                <TableCell className="heading">Submitted At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lead.map((order, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell
                      sx={{ borderBottom: index === lead.length - 1 ? 0 : "" }}
                    >
                      {order.name}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: index === lead.length - 1 ? 0 : "" }}
                    >
                      {order.email}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: index === lead.length - 1 ? 0 : "" }}
                    >
                      {order.phone}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: index === lead.length - 1 ? 0 : "" }}
                    >
                      {order.submittedAt}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
};

export default Lead;
