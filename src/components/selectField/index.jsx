import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "./selectField.scss";
const CustomSelect = (props) => {
  const {
    onChange,
    labelId,
    label,
    fieldId,
    menuData,
    value,
    name,
    helperText,
    error,
    fullWidth,
    margin,
  } = props;
  return (
    <FormControl
      fullWidth={fullWidth}
      size="small"
      margin={margin}
      error={error}
    >
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        labelId={labelId}
        id={fieldId}
        label={label}
        name={name}
        onChange={onChange}
        value={value}
        className="menu"
        aria-describedby={fieldId}
      >
        {menuData.map((item) => {
          return (
            <MenuItem value={item.value}>
              <div className="menu-item-value">
                {item.icon && (
                  <span className="material-icons">{item.icon}</span>
                )}
                {item.label}
              </div>
            </MenuItem>
          );
        })}
      </Select>
      {error && (
        <FormHelperText error={true}>
          <span>{helperText}</span>
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;
