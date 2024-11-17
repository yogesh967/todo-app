import { CircularProgress } from "@mui/material";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <CircularProgress size={30} /> <span className="title">Loading...</span>
    </div>
  );
};

export default Loader;
