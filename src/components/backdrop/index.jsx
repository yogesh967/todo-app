import { Backdrop, CircularProgress } from "@mui/material";
import "./backdrop.scss";
const BackdropLoader = (props) => {
  const { open, handleClose } = props;
  return (
    <Backdrop open={open} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoader;
