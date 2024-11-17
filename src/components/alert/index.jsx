import { Alert, Collapse, Typography } from "@mui/material";

const CollapseAlert = (props) => {
  const { open, severity, message, handleClose } = props;
  return (
    <Collapse in={open}>
      <Alert severity={severity} onClose={handleClose}>
        <Typography>{message}</Typography>
      </Alert>
    </Collapse>
  );
};

export default CollapseAlert;
