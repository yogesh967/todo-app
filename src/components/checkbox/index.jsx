import { Checkbox, Tooltip } from "@mui/material";
import "./checkbox.scss";

const CustomCheckbox = (props) => {
  const { disabled, color, onClick, size, checked } = props;
  return (
    <Tooltip title="Done" placement="top-start">
      <Checkbox
        size={size}
        color={color}
        onChange={onClick}
        disabled={disabled}
        checked={checked}
      />
    </Tooltip>
  );
};

export default CustomCheckbox;
