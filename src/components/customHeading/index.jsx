const { Typography } = require("@mui/material");

const CustomHeading = (props) => {
  return (
    <div className="custom-heading-box">
      <Typography variant={props.variant}>{props.heading}</Typography>
    </div>
  );
};

export default CustomHeading;
