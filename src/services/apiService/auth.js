// import { setSession } from "../utils/ManageSessions";

import { ENV_PATH, errorMsg, SignupErrorMsg } from "../../constants";

const BASE_PATH_URL = `${ENV_PATH}/api/v1/auth`;

const userLogin = async (data) => {
  try {
    const response = await fetch(`${BASE_PATH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response?.ok) {
      const res = await response.json();
      return res;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    throw new Error(
      errorMsg[err.message] ? errorMsg[err.message] : errorMsg.default
    );
  }
};

const userSignUp = async (data) => {
  try {
    const response = await fetch(`${BASE_PATH_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    throw new Error(
      SignupErrorMsg[err.message]
        ? SignupErrorMsg[err.message]
        : SignupErrorMsg.default
    );
  }
};

export { userLogin, userSignUp };
