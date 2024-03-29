import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./styles.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const lead = [
  {
    name: "Johnny",
    email: "john@gmail.com",
    phone: "214567890",
    submittedAt: "2001",
    status: "open",
  },
  {
    name: "HHage",
    email: "HHage@gmail.com",
    phone: "12345214",
    submittedAt: "2001",
    status: "closed",
  },
  {
    name: "Hkarrsv",
    email: "Hkarrsv@gmail.com",
    phone: "1347167890",
    submittedAt: "2001",
    status: "closed",
  },
  {
    name: "Luagsf",
    email: "Luagsf@gmail.com",
    phone: "34674325",
    submittedAt: "2001",
    status: "open",
  },
];

const AdminDashboard = () => {
  const [accountStatus, setAccountStatus] = useState(() => {
    const initialStatus = {};
    lead.forEach((order, index) => {
      initialStatus[index] = order.status;
    });
    return initialStatus;
  });

  const handleChange = (event: any, index: any) => {
    const { value } = event.target;
    setAccountStatus((prevState) => ({
      ...prevState,
      [index]: value,
    }));
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1, px: 8, py: 1 }}>
      <div className="text-5xl font-bold mb-6">All User</div>
      <Box className="flex justify-end mr-2 mb-2">
        <Button
          variant="contained"
          onClick={handleClickOpenDialog}
          sx={{
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
          startIcon={<PersonAddIcon />}
        >
          Invite user
        </Button>
      </Box>

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
                <TableCell className="heading">Account Status</TableCell>
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
                    <TableCell
                      sx={{ borderBottom: index === lead.length - 1 ? 0 : "" }}
                    >
                      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <Select
                          displayEmpty
                          value={accountStatus[index] || "No Status"}
                          onChange={(event) => handleChange(event, index)}
                          renderValue={(selected) => {
                            if (selected.length === 0) {
                              return <em>Placeholder</em>;
                            }
                            return selected;
                          }}
                        >
                          <MenuItem value="open">open</MenuItem>
                          <MenuItem value="closed">closed</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Card>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleCloseDialog();
          },
        }}
      >
        <DialogTitle sx={{ fontSize: 36, pb: 1, fontWeight: 700 }}>
          Invite Users
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the information about the user you want invite. The user will
            recieve an invite on the provided Email.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="chatBotId"
            name="chatBotId"
            label="ChatBot Id"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions sx={{ p: 4, pt: 0 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              color: "black",
              borderColor: "black",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
