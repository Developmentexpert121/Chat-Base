import {
  Box,
  Card,
  Table,
  TableBody,
  // TableCell,
  // TableRow,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { addSettingsData } from "../../services/slices/auth/dashboard-data.tsx";
import { useDispatch, useSelector } from "react-redux";
// import { getUsersConversation } from "../../services/slices/auth/users-conversation.tsx";

const SettingsSidebar = () => {
  const dispatch: any = useDispatch<any>();
  //   useEffect(() => {
  //     const chatbotId = localStorhours.getItem("chatbotId");
  //     const data = {
  //       chatbotId: chatbotId,
  //       startDate: "2024-03-12",
  //       endDate: "2024-12-12",
  //       phours: 1,
  //       size: 20,
  //     };
  //     dispatch(getUsersConversation(data));
  //   }, [dispatch]);

  //   const conversationData = useSelector(
  //     (state: any) => state.usersConversation.data
  //   );
  //   const handleChatSelect = (id: any) => {

  //   };

  //   const chat = conversationData?.data
  //     ? conversationData?.data.map((item: any) => ({
  //         name:
  //           item?.form_submission === null
  //             ? "Customer"
  //             : item?.form_submission?.email,
  //         id: item?.id,
  //       }))
  //     : null;

  const [hours, setHours] = useState<string | number>("");
  const [open, setOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<any>([]);
  const numbers = Array.from({ length: 24 }, (_, index) => index + 1);
  const handleChange = (event: SelectChangeEvent<typeof hours>) => {
    setHours(event.target.value);
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const handleChangeCheckbox = (index: any) => {
    setSelectedDays((prevSelectedDays: any) => {
      if (prevSelectedDays.includes(index)) {
        return prevSelectedDays.filter(
          (selectedDay: any) => selectedDay !== index
        );
      } else {
        return [...prevSelectedDays, index];
      }
    });
  };

  const handleSaveData = () => {
    const values = { hours: hours, selectedDays: selectedDays };
    dispatch(addSettingsData({ values: values }));
  };
  return (
    <Box sx={{ px: 4, py: 4 }} className="content-height">
      <Grid container spacing={3} className="mb-3">
        <Grid item xs={6}>
          <Typography
            variant="h2"
            gutterBottom
            className="heading-h2 font-bold mb-0"
          >
            Settings
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        ></Grid>
      </Grid>

      <Card
        sx={{
          boxShadow: 2,
          borderColor: "grey",
          borderWidth: 1,
          display: "flex",
          flexDirection: "row",
          height: "90%",
        }}
      >
        <Box sx={{ flex: "100%" }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 1, ml: 4 }}>
            Select Hours
          </Typography>

          <FormControl sx={{ ml: 4, minWidth: 300 }}>
            <InputLabel id="demo-controlled-open-select-label">
              Hours
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              value={hours}
              label="Hours"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {numbers.map((number: any) => (
                <MenuItem key={number} value={number}>
                  {number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="h6" gutterBottom sx={{ mt: 1, ml: 4 }}>
            Select Days
          </Typography>
          <Grid container spacing={2} sx={{ ml: 1 }}>
            {daysOfWeek.map((day: any, index: number) => (
              <Grid item xs={4} key={index}>
                <Checkbox
                  checked={selectedDays.includes(index)}
                  onChange={() => handleChangeCheckbox(index)}
                  inputProps={{ "aria-label": `checkbox-${day}` }}
                />
                {day}
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2, ml: 2 }}>
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="success"
                sx={{ width: 150 }}
                onClick={() => handleSaveData()}
              >
                Save
              </Button>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "flex-center" }}
            >
              <Button variant="contained" color="error" sx={{ width: 150 }}>
                Stop
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};

export default SettingsSidebar;
