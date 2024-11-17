export const ENV_PATH = "https://todo-app-api-rust.vercel.app";

export const SIGNUP_SUCCESS_MSG =
  "Congratulations, your account has been successfully created. Please login.";
export const SIGNUP_HEADING = "Create an new account";

export const TODO_UPDATE_SUCCESS_MSG = "Task updated successfully!";
export const TODO_ADD_SUCCESS_MSG = "Task added successfully!";
export const TODO_DELETE_SUCCESS_MSG = "Task deleted successfully!";
export const TODO_DONE_SUCCESS_MSG = "Task marked as done successfully!";
export const NO_DATA_FOUND = "No data found!";

export const errorMsg = {
  401: "Email or Password is incorrect. Please enter valid credentials.",
  400: "Something went wrong. Please try again.",
  default: "Something went wrong. Please try again.",
};

export const SignupErrorMsg = {
  401: "User already exist",
  400: "Something went wrong. Please try again.",
  default: "Something went wrong. Please try again.",
};

export const getAllTaskErrorMsg = {
  404: "Something went wrong. Please try again.",
  204: "No data found!",
  default: "Something went wrong. Please try again.",
};

export const createTaskErrorMsg = {
  404: "Something went wrong. Please try again",
  default: "Something went wrong. Please try again.",
};

export const deleteTaskErrorMsg = {
  400: "Something went wrong. Please try again.",
  404: "Task not found!",
  default: "Something went wrong. Please try again.",
};

export const sortMenuData = [
  { value: "pending", label: "Pending" },
  { value: "done", label: "Done" },
];

export const CategoryData = [
  {
    label: "Learning",
    value: "Learning",
    icon: "menu_book",
  },
  {
    label: "Family",
    value: "Family",
    icon: "home",
  },
  {
    label: "Social",
    value: "Social",
    icon: "group",
  },
  {
    label: "Health & Fitness",
    value: "Health & Fitness",
    icon: "fitness_center",
  },
  {
    label: "Work",
    value: "Work",
    icon: "work",
  },
  {
    label: "Financial",
    value: "Financial",
    icon: "payments",
  },
  {
    label: "Sports",
    value: "Sports",
    icon: "sports_soccer",
  },
  {
    label: "Other",
    value: "Other",
  },
];
