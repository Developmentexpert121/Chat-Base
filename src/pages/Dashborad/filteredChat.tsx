import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getUsersConversation } from "../../services/slices/auth/users-conversation.tsx";
import { useDispatch } from "react-redux";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const FilteredChat = ({ open, setOpen }: any) => {
  const dispatch = useDispatch<any>();
  const [value1, setValue1] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  const [value2, setValue2] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  const handleClose = () => {
    setOpen(false);
  };

  const filteredChatData = () => {
    const startDate = new Date(value1);
    const endDate = new Date(value2);

    const year1 = startDate.getFullYear();
    const month1 = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const day1 = startDate.getDate().toString().padStart(2, "0");

    const year2 = endDate.getFullYear();
    const month2 = (endDate.getMonth() + 1).toString().padStart(2, "0");
    const day2 = endDate.getDate().toString().padStart(2, "0");

    // Construct the formatted date string in the format 'YYYY-MM-DD'
    const formattedStartDate = `${year1}-${month1}-${day1}`;
    const formattedEndDate = `${year2}-${month2}-${day2}`;

    console.log(formattedStartDate);
    console.log(formattedEndDate);

    const chatbotId = localStorage.getItem("chatbotId");
    const data = {
      chatbotId: chatbotId,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      page: 1,
      size: 20,
    };
    dispatch(getUsersConversation(data));
    handleClose();
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "690px!important",
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Pick up date range
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Start Date"
                value={value1}
                onChange={(newValue) => setValue1(newValue)}
                sx={{ width: 700 }}
              />
              <DatePicker
                label="End Date"
                value={value2}
                onChange={(newValue) => setValue2(newValue)}
                sx={{ width: 700 }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => filteredChatData()}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default FilteredChat;
