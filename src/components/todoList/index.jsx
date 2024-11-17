import { Tooltip } from "@mui/material";
import CustomButton from "../button";
import CustomCheckbox from "../checkbox";
import "./todoList.scss";
import { formatDate } from "../../services/utils/utils";
const TodoItem = (props) => {
  const {
    title,
    fromDate,
    toDate,
    category,
    onEdit,
    onDelete,
    onChecked,
    checked,
    isHideBtn,
  } = props;

  return (
    <>
      <div className="item-container">
        {!isHideBtn && (
          <div className="checkbox">
            <CustomCheckbox onClick={onChecked} checked={checked} />
          </div>
        )}

        <div className="task-box">
          <div className="task-title-box">
            <Tooltip title={category?.title} placement="top-start">
              <span className="material-icons">{category?.icon}</span>
            </Tooltip>
            <div className="title">{title}</div>
          </div>
          <div className="date">
            <span>{formatDate(fromDate)}</span>
            <span className="line">-</span>
            <span>{formatDate(toDate)}</span>
          </div>
        </div>

        {!isHideBtn && (
          <div className="btn-box">
            <div className="editBtn">
              <CustomButton variant="contained" icon="edit" onClick={onEdit} />
            </div>
            <div className="deleteBtn">
              <CustomButton
                variant="contained"
                icon="delete"
                color="error"
                onClick={onDelete}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

TodoItem.defaultProps = {
  isHideBtn: false,
};

export default TodoItem;
