import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./selectField.scss";
const CustomSelect = (props) => {
  const { onChange, labelId, label, fieldId, menuData, value } = props;
  return (
    <FormControl fullWidth size="small" margin="normal">
      <InputLabel id={labelId}>{label}</InputLabel>

      <Select
        labelId={labelId}
        id={fieldId}
        label={label}
        onChange={onChange}
        // value={value}
        defaultValue={value}
        className="menu"
      >
        {menuData.map((item) => {
          return (
            <MenuItem value={item.value}>
              <div className="menu-item-value">
                {item.icon ? (
                  <span className="material-icons">{item.icon}</span>
                ) : (
                  ""
                )}
                {item.label}
              </div>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
