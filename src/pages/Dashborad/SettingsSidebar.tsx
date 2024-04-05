import {
  Box,
  Card,
  //Table,
  //TableBody,
  // TableCell,
  // TableRow,
  Typography,
  Button,
  Grid,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Header from "../../components/Header/Header.tsx";
import {
  addSettingsData,
  getScheduleCronUser,
  scheduleCronSettings,
  stopCronSettings,
} from "../../services/slices/auth/dashboard-data.tsx";
import { useDispatch, useSelector } from "react-redux";

import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  hours: yup.array().required("Hours is required"),
  daysOfWeek: yup
    .array()
    .of(yup.boolean())
    .test(
      "atLeastOneSelected",
      "Please select at least one day",
      (value: any) => {
        return value.some((day: any) => day === true);
      }
    ),
});

const defaultValues = {
  email: "",
  hours: [],
  daysOfWeek: [],
};

interface FormData {
  email: string;
  hours: any;
  daysOfWeek: any;
}

const SettingsSidebar = () => {
  const dispatch: any = useDispatch<any>();
  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState<boolean>(false);
  const numbers = Array.from({ length: 24 }, (_, index) => index + 1);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    dispatch(getScheduleCronUser())
      .unwrap()
      .then((res: any) => {
        const values = JSON.parse(res.data.values);
        setValue("email", res.data.emailTo);
        setValue("hours", values.hours);

        const selectedDays: any = values.selectedDays || []; // Ensure selectedDays is an array
        const selectedDaysObj: any = [];
        selectedDays.forEach((item: any) => {
          selectedDaysObj[item] = true;
        });
        setValue("daysOfWeek", selectedDaysObj);
      });
  }, [dispatch, setValue]);

  const croneUserData = useSelector(
    (state: any) => state.dashboardData.cronUser
  );

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleStop = () => {
    dispatch(stopCronSettings({ status: true }));
  };

  const handleStartCron = () => {
    setStats(true);
    const fetchData = async () => {
      dispatch(scheduleCronSettings({ status: true }));
    };
    fetchData();
    // Set up an interval to call the API every 5 minutes
    const interval = setInterval(fetchData, 60 * 60 * 1000); // 5 minutes in milliseconds
    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  };

  const onSubmit: any = (data: FormData) => {
    const indexedData = data.daysOfWeek
      .map((item: any, index: number) => (item === true ? index : ""))
      .filter((index: any) => index !== "");
    const values = { hours: data.hours, selectedDays: indexedData };
    dispatch(
      addSettingsData({
        values: values,
        emailTo: data.email,
        status: croneUserData.status ?? stats,
      })
    );
  };

  return (
    <Box sx={{ px: 4, py: 4 }} className="content-height p24px">
      <Grid container spacing={0} className="header-flex page-header flex justify-between items-center cs-shadow">
        <Grid item xs={6}>
          <Typography
            variant="h2"
            gutterBottom
            className="heading-h2 font-bold mb-0 header-col-left leading-tight">
            Settings
          </Typography>

        </Grid>
        <Grid
          item
          xs={6}
          sx={{ display: "flex", justifyContent: "flex-end" }} className="header-col-right"
        >
          <div className=" ps-4 hide-900">
            <Header setAuthUser={localStorage.getItem("token")} />
          </div>
        </Grid>
      </Grid>

      <Card
        sx={{
          borderColor: "grey",
          borderWidth: 0,
          display: "flex",
          flexDirection: "row",
          height: "90%",
        }}
        className="cs-shadow p24px"
      >
        <Box sx={{ flex: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* <Grid item xs={4}>
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
            </Grid> */}
              <Grid item sm={6} xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 0, ml: 0 }}>
                  Select Hours
                </Typography>
                <Controller
                  name="hours"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id="demo-controlled-open-select-label">
                        Hours
                      </InputLabel>
                      <Select
                        {...field}
                        multiple
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        label="Hours"
                        error={!!errors.hours}
                        value={Array.isArray(field.value) ? field.value : []} // Ensure value is an array
                        onChange={(event) => {
                          const { value } = event.target;
                          field.onChange(value); // Update the field value
                        }}
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
                      {errors.hours && (
                        <FormHelperText error>
                          {errors.hours.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 0, ml: 0 }}>
                  Email
                </Typography>

                <FormControl sx={{ width: '100%' }}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 0, ml: 0 }} className="pt-4">
              Select Days
            </Typography>
            {/* <Grid container spacing={2} sx={{ ml: 1 }}>
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
          </Grid> */}

            <Grid container spacing={1} sx={{}} className="">
              {daysOfWeek.map((day: any, index: number) => (
                <Grid item sm={4} xs={6} key={index}>
                  <FormControl
                    component="fieldset"
                    error={!!errors.daysOfWeek?.root}
                  >
                    <Controller
                      name={`daysOfWeek.${index}`}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox {...field} checked={!!field.value} />
                          }
                          label={day}
                        />
                      )}
                    />
                    {index === 6 &&
                      errors.daysOfWeek &&
                      errors.daysOfWeek.root &&
                      !watch("daysOfWeek")?.find(
                        (item: any) => item === true
                      ) && (
                        <FormHelperText>
                          {errors.daysOfWeek?.root?.message}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={2} sx={{ mt: 0, ml: 0 }}>
              <Grid item xs={8} className="pl-0">
                <Button
                  variant="contained"
                  color="success"
                  sx={{ width: 150 }}
                  // onClick={() => handleSaveData()}
                  type="submit"
                  className="btn-primary"
                >
                  Save
                </Button>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ display: "flex", justifyContent: "flex-end", pr: 2 }}
              >
                {croneUserData.status === 0 ? (
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ width: 150, }}
                    onClick={() => handleStartCron()}
                  >
                    Start
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ width: 150 }}
                    onClick={() => handleStop()}
                  >
                    Stop
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default SettingsSidebar;
