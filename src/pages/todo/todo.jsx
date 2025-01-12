import { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import Logo from "../../components/logo";
import "./style.scss";
import CustomButton from "../../components/button";
import CustomTextField from "../../components/textField";
import TodoItem from "../../components/todoList";
import AddUpdateTaskModal from "../../components/AddUpdateTaskModal";
import AlertModal from "../../components/alertModal";
import {
  createTodo,
  DeleteTodo,
  DoneTodo,
  getAllTodo,
  updateTodo,
} from "../../services/apiService/todo";
import Loader from "../../components/loader";
import CollapseAlert from "../../components/alert";
import { getCategoryData } from "../../services/utils/utils";
import { isBlankField } from "../../services/utils/validation";
import {
  NO_DATA_FOUND,
  sortMenuData,
  TODO_ADD_SUCCESS_MSG,
  TODO_DELETE_SUCCESS_MSG,
  TODO_DONE_SUCCESS_MSG,
  TODO_UPDATE_SUCCESS_MSG,
} from "../../constants";
import BackdropLoader from "../../components/backdrop";
import CustomSelect from "../../components/selectField";
import MenuWithAvatar from "../../components/menuWithAvatar";
import { AuthContext } from "../../context/AuthContext";

const Todo = () => {
  const initialState = {
    userId: "",
    taskName: "",
    category: "",
    isDone: false,
    fromDate: null,
    toDate: null,
  };
  const [task, setTask] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState(true);
  const [updatedData, setUpdatedData] = useState(initialState);
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const [errors, setErrors] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [sort, setSort] = useState("pending");
  const [filteredTask, setFilteredTask] = useState(null);
  const [isfetchAllTask, setIsfetchAllTask] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [isErrorAlert, setIsErrorAlert] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const { logout, user } = useContext(AuthContext);

  const modalTitle = isEdit ? "Edit task" : "Create new task";

  const handleEdit = (data) => {
    setIsEdit(true);
    setData(data);
    setUpdatedData(data);
    setOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    resetStates();
  };

  const handleAddTask = () => {
    setIsEdit(false);
    setOpen(true);
  };

  const handleDeleteModal = (task) => {
    setUpdatedData({ id: task._id, taskName: task.taskName });
    setIsConfirmModalOpen(true);
  };

  const handleChecked = (e, task) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (isChecked) {
      setUpdatedData({ id: task._id, taskName: task.taskName });
      setIsConfirmModalOpen(true);
    }
  };

  const resetStates = () => {
    setUpdatedData(initialState);
    setData(initialState);
    setIsEdit(false);
    setErrors("");
    setIsSubmit(false);
    setIsBtnDisable(true);

    setIsErrorAlert({
      open: false,
      message: "",
      severity: "error",
    });
  };

  const handleClose = () => {
    resetStates();
    setOpen(false);
  };

  const validateForm = (values) => {
    const errors = {};
    for (const [key, value] of Object.entries(values)) {
      let errMsg = "";
      switch (key) {
        case "taskName":
        case "category":
        case "fromDate":
        case "toDate":
          errMsg = isBlankField(value);
          break;
        default:
          break;
      }
      if (errMsg) errors[key] = errMsg;
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(updatedData));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && Object.keys(errors).length === 0) {
      setLoader(true);
      if (!isEdit) {
        const newTodo = async () => {
          try {
            const res = await createTodo(updatedData);
            if (res) {
              setIsfetchAllTask(true);
              setLoader(false);
              setAlert({
                open: true,
                message: TODO_ADD_SUCCESS_MSG,
                severity: "success",
              });
              handleClose();
            }
          } catch (err) {
            setLoader(false);
            setIsErrorAlert({
              open: true,
              message: err.message,
              severity: "error",
            });
          }
        };
        newTodo();
        setIsSubmit(false);
      } else {
        const updateTask = async () => {
          try {
            const res = await updateTodo(updatedData);
            if (res) {
              setIsfetchAllTask(true);
              setLoader(false);
              setAlert({
                open: true,
                message: TODO_UPDATE_SUCCESS_MSG,
                severity: "success",
              });
              handleClose();
            }
          } catch (err) {
            setLoader(false);
            setIsErrorAlert({
              open: true,
              message: err.message,
              severity: "error",
            });
          }
        };
        updateTask();
        setIsSubmit(false);
      }
    }
  }, [errors]);

  const handleDeleteTask = async () => {
    try {
      setLoader(true);
      const res = await DeleteTodo(updatedData?.id);
      if (res) {
        setIsfetchAllTask(true);
        closeConfirmModal();
        setLoader(false);
        setAlert({
          open: true,
          message: TODO_DELETE_SUCCESS_MSG,
          severity: "success",
        });
      }
    } catch (e) {
      closeConfirmModal();
      setLoader(false);
      setAlert({ open: true, message: e.message, severity: "warning" });
    }
  };

  const handleDoneTask = async () => {
    try {
      setLoader(true);
      const res = await DoneTodo(updatedData?.id, true);
      if (res) {
        setIsfetchAllTask(true);
        closeConfirmModal();
        setLoader(false);
        setAlert({
          open: true,
          message: TODO_DONE_SUCCESS_MSG,
          severity: "success",
        });
      }
    } catch (e) {
      closeConfirmModal();
      setLoader(false);
      setAlert({ open: true, message: e.message, severity: "warning" });
    }
  };

  // Effect to handle auto-hiding the alert
  useEffect(() => {
    let timer;
    if (alert?.open) {
      timer = setTimeout(() => {
        setAlert({ open: false, message: "", severity: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllTodo();
        if (res) {
          setTask(res);
          setLoading(false);
          setIsfetchAllTask(false);
        }
      } catch (e) {
        setLoading(false);
        setIsfetchAllTask(false);
        setAlert({ open: true, message: e.message, severity: "warning" });
      }
    };
    fetchData();
  }, [isfetchAllTask]);

  useEffect(() => {
    const isDone = sort === "done" ? true : false;
    if (task) {
      const filteredData = task?.filter((item) => item.isDone === isDone);
      if (searchTerm.length) {
        console.log("in search useEffect");
        const searchFilteredData = filteredData?.filter((item) =>
          item?.taskName.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setFilteredTask(searchFilteredData);
      } else {
        setFilteredTask(filteredData);
      }
    }
  }, [task, sort, searchTerm]);

  const handleUserList = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserListClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Grid container className="todo-container">
        <Grid item xs={12} md={8} className="todo-box">
          <div className="todo-header">
            <div className="todo-logo">
              <Logo />
            </div>
            <div class="user-options">
              <MenuWithAvatar
                onBtnClick={handleUserList}
                onClose={handleUserListClose}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                menuItem={[{ label: "Logout", onClick: handleLogout }]}
                avatarLabel={user?.firstName}
              />
            </div>
          </div>

          <div className="add-filter-container">
            <CustomButton
              variant="contained"
              label="Add Task"
              onClick={handleAddTask}
              icon="add_circle"
            />
            <CustomTextField
              name="search"
              id="search"
              placeholder="Search"
              size="small"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {alert?.open && (
            <div className="alert-container">
              <CollapseAlert
                open={alert.open}
                severity={alert.severity}
                message={alert.message}
                handleClose={() => setAlert({ ...alert, open: false })}
              />
            </div>
          )}

          <div className="list-container">
            <div className="sort-container">
              <CustomSelect
                fieldId="sort"
                name="sort"
                value={sort}
                menuData={sortMenuData}
                onChange={(e) => setSort(e.target.value)}
              />
            </div>
            {isLoading && <Loader />}

            {!isLoading && (!filteredTask || filteredTask?.length === 0) && (
              <p className="no-data-msg">{NO_DATA_FOUND}</p>
            )}

            {filteredTask &&
              filteredTask?.length !== 0 &&
              !isLoading &&
              filteredTask?.map((item) => {
                return (
                  <TodoItem
                    title={item?.taskName}
                    fromDate={item?.fromDate}
                    toDate={item?.toDate}
                    category={getCategoryData(item?.category)}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => handleDeleteModal(item)}
                    onChecked={(e) => handleChecked(e, item)}
                    isChecked={isChecked}
                    isHideBtn={sort === "done"}
                  />
                );
              })}

            <AddUpdateTaskModal
              open={open}
              onClose={handleClose}
              title={modalTitle}
              data={data}
              setUpdatedData={setUpdatedData}
              updatedData={updatedData}
              onSubmit={handleSubmit}
              isBtnDisable={isBtnDisable}
              setIsBtnDisable={setIsBtnDisable}
              isEdit={isEdit}
              id={isEdit ? "update-task" : "add-task"}
              errors={errors}
              isAlert={isErrorAlert}
              HandleAlert={() => {
                setIsErrorAlert({ ...isErrorAlert, open: false });
              }}
            />
            {!isChecked ? (
              <AlertModal
                open={isConfirmModalOpen}
                title="Delete Task"
                message={`You are about to delete the task: "${updatedData?.taskName}". Proceed with deletion?`}
                id="delete-task"
                actionBtnLabel="Delete"
                actionBtnColor="error"
                cancelBtnLabel="Cancel"
                handleAction={handleDeleteTask}
                handleClose={closeConfirmModal}
              />
            ) : (
              <AlertModal
                open={isConfirmModalOpen}
                title="Confirm Completion"
                message={`You are about to mark the task "${updatedData?.taskName}" as done. Would you like to continue?`}
                id="delete-task"
                actionBtnLabel="Yes"
                cancelBtnLabel="No"
                cancelBtnColor="error"
                actionBtnColor="primary"
                handleAction={handleDoneTask}
                handleClose={closeConfirmModal}
              />
            )}
          </div>
        </Grid>
      </Grid>
      {loader && <BackdropLoader open={loader} />}
    </>
  );
};

export default Todo;
