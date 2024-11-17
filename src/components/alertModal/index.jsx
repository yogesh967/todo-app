import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const AlertModal = (props) => {
  const {
    open,
    handleClose,
    id,
    title,
    message,
    handleAction,
    actionBtnLabel,
    cancelBtnColor,
    actionBtnColor,
    cancelBtnLabel,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={`${id}-alert-dialog`}
    >
      <DialogTitle id={`${id}-alert-dialog`}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id={`${id}-alert-description`}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color={cancelBtnColor}>
          {cancelBtnLabel}
        </Button>
        <Button
          onClick={handleAction}
          variant="contained"
          color={actionBtnColor}
        >
          {actionBtnLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertModal;
