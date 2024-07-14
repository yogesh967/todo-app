import Logo from "../../components/logo";
import { Grid } from "@mui/material";
import "./style.scss";
import CustomButton from "../../components/button";
import CustomTextField from "../../components/textField";
import TodoItem from "../../components/todoList";
import { todoData } from "../../constants/mocks";
import { useState } from "react";
import AddUpdateTaskModal from "../../components/AddUpdateTaskModal";

const Todo = () => {
  const [task, setTask] = useState(todoData);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({
    id: "",
    task: "",
    catergory: "",
    fromDate: "",
    toDate: "",
  });

  const modalTitle = isEdit ? "Edit task" : "Create new task";

  const handleEdit = (data) => {
    setIsEdit(true);
    console.log(data);
    setData(data);
    // const editedTask = {
    //   id: id,
    //   taskName: "Create react project",
    //   date: "5:23 AM, 01/06/2022",
    //   category: {
    //     title: "Social & Family",
    //     icon: "menu_book",
    //   },
    //   isDone: false,
    //   isDelete: false,
    // };
    // setTask(
    //   task.map((item) => {
    //     return item.id === id ? { ...editedTask } : item;
    //   })
    // );
    setOpen(true);
  };

  const handleAddTask = () => {
    setIsEdit(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container className="todo-container">
        <Grid item xs={12} md={8} className="todo-box">
          <div className="todo-logo">
            <Logo />
          </div>
          <div className="add-filter-container">
            <CustomButton
              variant="contained"
              label="Add Task"
              size="large"
              onClick={handleAddTask}
            />
            <CustomTextField
              name="search"
              id="search"
              placeholder="Search"
              size="small"
            />
          </div>

          <div className="list-container">
            {todoData.map((item) => {
              return (
                <TodoItem
                  title={item.taskName}
                  date={item.fromDate}
                  category={item.category}
                  onEdit={() => handleEdit(item)}
                />
              );
            })}

            <AddUpdateTaskModal
              open={open}
              onClose={handleClose}
              title={modalTitle}
              setData={setData}
              data={data}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Todo;
