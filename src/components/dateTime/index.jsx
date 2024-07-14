import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./dateTime.scss";

const DateTime = (props) => {
  const { label, onChange } = props;
  return (
    <div className="date-range">
      <div className="calender-icon">
        <span className="material-icons">date_range</span>
      </div>
      <div className="dataTime-Container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            label={label}
            disablePast
            slotProps={{ textField: { size: "small" } }}
            onChange={onChange}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default DateTime;
