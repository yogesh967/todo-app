import { Button } from "@mui/material";
import "./button.scss";

const CustomButton = (props) => {
  const { label, variant, fullWidth, color, type, onClick } = props;
  return (
    <div>
      <Button
        variant={variant}
        fullWidth={fullWidth}
        color={color}
        type={type}
        onClick={onClick}
      >
        {label}
      </Button>
    </div>
  );
};

export default CustomButton;
