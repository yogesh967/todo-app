import { Tooltip } from "@mui/material";
import CustomButton from "../button";
import CustomCheckbox from "../checkbox";
import "./todoList.scss";
const TodoItem = (props) => {
  const { title, date, category, onEdit, onDelete } = props;
  return (
    <>
      <div className="item-container">
        <div className="checkbox">
          <CustomCheckbox />
        </div>

        <div className="task-box">
          <div className="task-title-box">
            <Tooltip title={category.title} placement="top-start">
              <span className="material-icons">{category.icon}</span>
            </Tooltip>
            <div className="title">{title}</div>
          </div>
          <div className="date">{date}</div>
        </div>

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
      </div>
    </>
  );
};

export default TodoItem;
