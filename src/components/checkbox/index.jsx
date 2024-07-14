import { Checkbox, Tooltip } from "@mui/material";
import "./checkbox.scss";

const CustomCheckbox = (props) => {
  const { disabled, color, onChange, size } = props;
  return (
    <Tooltip title="Done" placement="top-start">
      <Checkbox
        size={size}
        color={color}
        onChange={onChange}
        disabled={disabled}
      />
    </Tooltip>
  );
};

export default CustomCheckbox;
