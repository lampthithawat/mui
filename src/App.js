import React from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import TodosFetch from "./components/TodosFetch";

function App() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    mobile: "",
    city: "",
    gender: "",
    age: "",
    dob: null,
    isPermanent: false,
  });
  const [cleared, setCleared] = React.useState(false);
  const [submittedData, setSubmittedData] = React.useState(null);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, isPermanent: e.target.checked }));
  };

  const handleSubmit = () => {
    setSubmittedData(formData);
  };

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <>
      <div>
        <TodosFetch />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            name="firstName"
            label="First Name"
            variant="filled"
            value={formData.firstName}
            onChange={handleInputChange}
            sx={{ marginLeft: 2, marginTop: 2, width: 200 }}
          />
          <TextField
            name="lastName"
            label="Last Name"
            variant="filled"
            value={formData.lastName}
            onChange={handleInputChange}
            sx={{ marginLeft: 2, marginTop: 2, width: 200 }}
          />
          <TextField
            name="mobile"
            label="Mobile Number"
            variant="filled"
            value={formData.mobile}
            onChange={handleInputChange}
            sx={{ marginLeft: 2, marginTop: 2, width: 200 }}
          />
          <TextField
            name="city"
            label="City"
            variant="filled"
            value={formData.city}
            onChange={handleInputChange}
            sx={{ marginLeft: 2, marginTop: 2, width: 200 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 40,
            marginTop: 10,
          }}
        >
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ marginTop: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Age</InputLabel>
              <Select
                name="age"
                value={formData.age}
                label="Age"
                onChange={handleInputChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ width: "100%", marginTop: 2, position: "relative" }}>
              <DemoItem label="Date of Birth">
                <DesktopDatePicker
                  value={formData.dob}
                  onChange={(newDate) =>
                    setFormData((prev) => ({ ...prev, dob: newDate }))
                  }
                  slotProps={{
                    field: {
                      clearable: true,
                      onClear: () => {
                        setFormData((prev) => ({ ...prev, dob: null }));
                        setCleared(true);
                      },
                    },
                  }}
                  sx={{ width: 260 }}
                />
              </DemoItem>
              {cleared && (
                <Alert
                  sx={{ position: "absolute", bottom: 0, right: 0 }}
                  severity="success"
                >
                  Field cleared!
                </Alert>
              )}
            </Box>
          </LocalizationProvider>

          <FormGroup row sx={{ marginTop: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isPermanent}
                  onChange={handleCheckboxChange}
                />
              }
              label="Permanent Employee"
            />
          </FormGroup>

          <Stack direction="row" sx={{ marginTop: 2 }}>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </div>
      </div>
      {submittedData && (
        <Box
          sx={{
            marginTop: 4,
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Form Output:</Typography>
          <pre>
            {JSON.stringify(
              {
                ...submittedData,
                dob: submittedData.dob
                  ? dayjs(submittedData.dob).format("YYYY-MM-DD")
                  : null,
              },
              null,
              2
            )}
          </pre>
        </Box>
      )}
    </>
  );
}

export default App;
