import { TextField } from "@mui/material";
import "./textfield.scss";

const CustomTextField = (props) => {
  const {
    type,
    label,
    id,
    name,
    onChange,
    value,
    error,
    fullWidth,
    helperText,
    variant,
    autoFocus,
    required,
    placeholder,
    margin,
    size,
    select,
  } = props;
  return (
    <div className="textfield">
      <TextField
        select={select}
        margin={margin}
        required={required}
        type={type}
        label={label}
        variant={variant}
        id={id}
        autoFocus={autoFocus}
        name={name}
        onChange={onChange}
        value={value}
        error={error}
        fullWidth={fullWidth}
        helperText={helperText}
        placeholder={placeholder}
        size={size}
      >
        {" "}
        {props.children}
      </TextField>
    </div>
  );
};

export default CustomTextField;
