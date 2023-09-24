const isBlankField = (value) => {
  if (value === "") return "Field should not be blank";
};

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const isValidEmail = (email) => {
  if (email !== "" && !emailRegex.test(email))
    return "Please enter valid email address";
  else return "";
};

const isValidPassword = (password) => {
  if (password !== "" && password.length < 6)
    return "Password should not be less than 6 charecters";
  else if (password !== "" && password.length > 20)
    return "Password should not be more than 20 charecters";
  else return "";
};

const charRegex = /^[a-zA-Z]*$/;
const isValidName = (name) => {
  if (name !== "" && !charRegex.test(name))
    return "Please enter characters only";
  else return "";
};

export { isValidEmail, isValidPassword, isBlankField, isValidName };
