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
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./styles.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../services/slices/admin/all-users.tsx";
import { inviteUser } from "../../services/slices/admin/invite-user.tsx";
import toast from "react-hot-toast";
import { updateRestrictions } from "../../services/slices/admin/update-restricted.tsx";
import Header from "../../components/Header/Header.tsx";

const AdminDashboard = () => {
  const dispatch: any = useDispatch();
  const data = useSelector((state: any) => state.allUsers.data);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleChange = (event: any, index: any, id: any) => {
    const { value } = event.target;
    dispatch(
      updateRestrictions({
        userId: id,
        isRestricted: value === "open" ? true : false,
      })
    )
      .unwrap()
      .then((response: any) =>
        response?.success === true
          ? toast.success("Account status updated successfully")
          : toast.error("Something went wrong")
      );
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1, px: 4, py: 4 }} className="p24px">
        <div className="header-flex page-header flex justify-between items-center cs-shadow">
          <div className="heading-h2 font-bold mb-0 header-col-left leading-tight">
            All Users
          </div>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
            className="header-col-right"
          >
            <Button
            variant="contained"
            onClick={handleClickOpenDialog}
            className="btn-primary text-nowrap"
            sx={{
              backgroundColor: "#E16349",
              "&:hover": {
                backgroundColor: "#E16349",
              },
            }}
            startIcon={<PersonAddIcon />}
          >
            Invite user
          </Button>
            <div className="header-col-right ps-4 hide-900">
              <Header setAuthUser={localStorage.getItem("token")}/>
            </div>
          </Grid>
      </div>
      {/* <div className="text-5xl text-white font-bold mb-6">All Users</div> */}

      <Card
        sx={{
          borderColor: "grey",
          borderWidth: 0,
        }}
        className="cs-shadow"
      >
        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow className="cs-table-bg-gradient">
                <TableCell className="heading text-nowrap text-white">Name</TableCell>
                <TableCell className="heading text-nowrap text-white">Email</TableCell>
                <TableCell className="heading text-nowrap text-white">Phone</TableCell>
                <TableCell className="heading text-nowrap text-white">Submitted At</TableCell>
                <TableCell className="heading text-nowrap text-white">Account Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((order: any, index: any) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell
                      sx={{ borderBottom: index === data.length - 1 ? 0 : "" }}
                    >
                      {order.firstName} {order.lastName}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: index === data.length - 1 ? 0 : "" }}
                    >
                      {order.email}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: index === data.length - 1 ? 0 : "" }}
                    >
                      {order.mobile}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: index === data.length - 1 ? 0 : "" }}
                    >
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: index === data.length - 1 ? 0 : "" }}
                    >
                      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <Select
                          displayEmpty
                          value={
                            order.isRestricted === false
                              ? "open"
                              : "closed" || "No Status"
                          }
                          onChange={(event) =>
                            handleChange(event, index, order.id)
                          }
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
            const chatBotId = formJson.chatBotId;
            dispatch(inviteUser({ email: email, chatbotId: chatBotId }))
              .unwrap()
              .then((response: any) =>
                response?.success === true
                  ? toast.success("Invite sent successfully")
                  : toast.error(response.message)
              );
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
