import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./dateTime.scss";
import { FormControl, TextField } from "@mui/material";

const DateTime = (props) => {
  const { label, onChange, value, disablePast, error, helperText } = props;
  return (
    <div className="dataTime-Container">
      <div className="calender-icon">
        <span className="material-icons">date_range</span>
      </div>
      <FormControl margin="normal">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            label={label}
            disablePast={disablePast}
            renderInput={(params) => <TextField {...params} />}
            slotProps={{
              textField: {
                size: "small",
                helperText: helperText,
                error: error,
              },
            }}
            format="DD/MM/YYYY hh:mm A"
            value={value}
            onChange={onChange}
          />
        </LocalizationProvider>
      </FormControl>
    </div>
  );
};

export default DateTime;
