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
import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import CollapseAlert from "../alert";

const AddUpdateTaskModal = (props) => {
  const {
    open,
    title,
    onClose,
    onSubmit,
    data,
    setUpdatedData,
    updatedData,
    isBtnDisable,
    setIsBtnDisable,
    isEdit,
    errors,
    isAlert,
    HandleAlert,
    id,
  } = props;

  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
    setIsBtnDisable(data[name] === value);
  };

  useEffect(() => {
    if (updatedData?.userId === "" && open) {
      setUpdatedData({ ...updatedData, userId: user?.id });
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={`${id}-dialog`}
      fullWidth
    >
      <DialogTitle id={`${id}-dialog`}>{title}</DialogTitle>
      <DialogContent>
        {isAlert?.open && (
          <CollapseAlert
            open={isAlert.open}
            severity={isAlert.severity}
            message={isAlert.message}
            handleClose={HandleAlert}
          />
        )}
        <DialogContentText id={`${id}-form`}>
          <CustomTextField
            margin="normal"
            name="taskName"
            id="task"
            label="Task"
            size="small"
            value={updatedData?.taskName}
            fullWidth
            onChange={handleChange}
            error={errors.taskName ? true : false}
            helperText={errors.taskName}
          />
          <CustomSelect
            menuData={CategoryData}
            label="Category"
            labelId="category-label"
            fieldId="category"
            name="category"
            value={updatedData?.category}
            margin="normal"
            fullWidth={true}
            onChange={handleChange}
            error={errors.category ? true : false}
            helperText={errors.category}
          />

          <div className="date-time-container">
            <DateTime
              disablePast={!isEdit}
              label="From"
              value={
                updatedData?.fromDate ? dayjs(updatedData?.fromDate) : null
              }
              onChange={(newValue) => {
                setUpdatedData({ ...updatedData, fromDate: newValue });
              }}
              error={errors.fromDate ? true : false}
              helperText={errors.fromDate}
            />
            <div className="arrow-icon">
              <span className="material-icons">arrow_forward</span>
            </div>
            <DateTime
              disablePast={!isEdit}
              label="To"
              value={updatedData?.toDate ? dayjs(updatedData?.toDate) : null}
              onChange={(newValue) => {
                setUpdatedData({ ...updatedData, toDate: newValue });
              }}
              error={errors.toDate ? true : false}
              helperText={errors.toDate}
            />
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="error">
          Close
        </Button>
        <Button onClick={onSubmit} variant="contained" disabled={isBtnDisable}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUpdateTaskModal;
