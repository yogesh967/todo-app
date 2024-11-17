import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import "./menuWithAvatar.css";

const MenuWithAvatar = (props) => {
  const { onBtnClick, avatarLabel, anchorEl, open, onClose, menuItem } = props;
  return (
    <>
      <Button onClick={onBtnClick} color="inherit">
        <Avatar /> <div className="avatar-label">{avatarLabel}</div>
        <div className={`material-icons arrow ${open ? "rotate" : ""}`}>
          arrow_drop_down
        </div>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={onClose} color="inherit">
        {menuItem.map((item) => (
          <MenuItem onClick={item?.onClick}>{item?.label}</MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuWithAvatar;
