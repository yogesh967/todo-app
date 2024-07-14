import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CustomTextField from "../textField";
import CustomSelect from "../selectField";
import { CategoryData } from "../../constants";
import DateTime from "../dateTime";
import "./modal.scss";

const AddUpdateTaskModal = (props) => {
  const { open, title, onClose, onSubmit, setData, data } = props;
  console.log(data);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll="body"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <CustomTextField
            margin="normal"
            name="task"
            id="task"
            label="Task"
            size="small"
            value={data?.taskName}
            fullWidth
            onChange={(e) => {
              setData({ ...data, taskName: e.target.value });
              console.log(e.target.value);
            }}
          />

          <CustomSelect
            menuData={CategoryData}
            label="Catergory"
            labelId="catergory-label"
            fieldId="catergory"
            value={data?.category?.title}
            onChange={(e) => {
              setData({ ...data, catergory: e.target.value });
              console.log(e.target.value);
            }}
          />

          <div className="date-time-container">
            <DateTime
              label="From"
              onChange={(newValue) => {
                setData({ ...data, fromDate: newValue.$d });
                console.log(newValue);
              }}
            />
            <div className="arrow-icon">
              <span className="material-icons">arrow_forward</span>
            </div>
            <DateTime
              label="To"
              onChange={(newValue) => {
                setData({ ...data, toDate: newValue.$d });
                console.log(newValue);
              }}
            />
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="error">
          Close
        </Button>
        <Button onClick={onSubmit} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUpdateTaskModal;
