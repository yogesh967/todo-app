const isBlankField = (value) => {
  if (!value) return "Field should not be blank";
  else return "";
};

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const isValidEmail = (email) => {
  if (email && !emailRegex.test(email))
    return "Please enter valid email address";
  else return "";
};

const isValidPassword = (password) => {
  if (password) {
    if (password.length < 6)
      return "Password should not be less than 6 charecters";
    else if (password.length > 20)
      return "Password should not be more than 20 charecters";
    else return "";
  }
};

const isValidConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword !== password) return "Password does not match";
  else return "";
};

const charRegex = /^[a-zA-Z]*$/;
const isValidName = (name) => {
  if (name && !charRegex.test(name)) return "Please enter characters only";
  else return "";
};

export {
  isValidEmail,
  isValidPassword,
  isBlankField,
  isValidName,
  isValidConfirmPassword,
};
