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
import React, { useEffect, useState } from "react";
import "./styles.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../services/slices/admin/all-users.tsx";
import { inviteUser } from "../../services/slices/admin/invite-user.tsx";
import toast from "react-hot-toast";
import { updateRestrictions } from "../../services/slices/admin/update-restricted.tsx";

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
    <Box sx={{ flexGrow: 1, px: 8, py: 1 }}>
      <div className="text-5xl text-white font-bold mb-6">All Users</div>
      <Box className="flex justify-end mr-2 mb-2">
        <Button
          variant="contained"
          onClick={handleClickOpenDialog}
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
