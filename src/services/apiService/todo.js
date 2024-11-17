import {
  createTaskErrorMsg,
  deleteTaskErrorMsg,
  ENV_PATH,
  getAllTaskErrorMsg,
} from "../../constants";
import { getSession } from "../utils/ManageSessions";

const BASE_PATH_URL = `${ENV_PATH}/api/v1/todo`;

const getAllTodo = async () => {
  try {
    const token = getSession("token");
    const response = await fetch(`${BASE_PATH_URL}/fetchAllTodos`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok && response.status === 200) {
      const res = await response.json();
      return res;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    throw new Error(
      getAllTaskErrorMsg[err.message]
        ? getAllTaskErrorMsg[err.message]
        : getAllTaskErrorMsg.default
    );
  }
};

const updateTodo = async (data) => {
  try {
    const token = getSession("token");
    const todoData = {
      userId: data?.userId,
      taskName: data?.taskName,
      category: data?.category,
      fromDate: data?.fromDate,
      toDate: data?.toDate,
      isDone: data?.isDone,
    };
    const response = await fetch(`${BASE_PATH_URL}/updateTodo/${data?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(todoData),
    });
    if (response.ok) {
      const res = await response.json();
      return res;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    throw new Error(
      deleteTaskErrorMsg[err.message]
        ? deleteTaskErrorMsg[err.message]
        : deleteTaskErrorMsg.default
    );
  }
};

const createTodo = async (data) => {
  try {
    const token = getSession("token");
    const response = await fetch(`${BASE_PATH_URL}/createTodo`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const res = await response.json();
      return res;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    throw new Error(
      createTaskErrorMsg[err.message]
        ? createTaskErrorMsg[err.message]
        : createTaskErrorMsg.default
    );
  }
};

const DeleteTodo = async (id) => {
  try {
    const token = getSession("token");
    const response = await fetch(`${BASE_PATH_URL}/deleteTodo/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const res = await response.json();
      return res;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    throw new Error(
      deleteTaskErrorMsg[err.message]
        ? deleteTaskErrorMsg[err.message]
        : deleteTaskErrorMsg.default
    );
  }
};

const DoneTodo = async (id, isDone) => {
  try {
    const token = getSession("token");
    const response = await fetch(`${BASE_PATH_URL}/doneTodo/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isDone: isDone }),
    });
    if (response.ok) {
      const res = await response.json();
      return res;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    throw new Error(
      deleteTaskErrorMsg[err.message]
        ? deleteTaskErrorMsg[err.message]
        : deleteTaskErrorMsg.default
    );
  }
};

export { getAllTodo, updateTodo, createTodo, DeleteTodo, DoneTodo };
