import { Button } from "@mui/material";
import "./button.scss";

const CustomButton = (props) => {
  const { icon, variant, fullWidth, color, type, onClick, size, label } = props;
  return (
    <Button
      variant={variant}
      fullWidth={fullWidth}
      color={color}
      type={type}
      size={size}
      onClick={onClick}
    >
      {icon ? <span className="material-icons">{icon}</span> : label}
    </Button>
  );
};

export default CustomButton;
