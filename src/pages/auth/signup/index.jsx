import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/button";
import CustomHeading from "../../../components/heading";
import CustomLink from "../../../components/link";
import CustomTextField from "../../../components/textField";
import Logo from "../../../components/logo";
import {
  isBlankField,
  isValidConfirmPassword,
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../../../utils/validation";
import "./../style.scss";

const Signup = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [userValues, setUserValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(userValues));
    console.log(formErrors);
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log("submit useEffect: ");

    if (isSubmit && Object.keys(formErrors).length === 0) {
      console.log(userValues);
      const requestOptions = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName: userValues?.firstName,
          lastName: userValues?.lastName,
          email: userValues?.email,
          password: userValues.con,
        }),
      };
    }
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
  };

  const validateForm = (values) => {
    const errors = {};
    const firstName =
      isValidName(values.firstName) || isBlankField(values.firstName);
    const lastName =
      isValidName(values.lastName) || isBlankField(values.lastName);
    const email = isValidEmail(values.email) || isBlankField(values.email);
    const password =
      isValidPassword(values.password) || isBlankField(values.password);
    const confirmPassword =
      isValidConfirmPassword(values.password, values.confirmPassword) ||
      isBlankField(values.confirmPassword);

    if (firstName !== "") {
      errors.firstNameErrorFlag = true;
      errors.firstNameHelperText = firstName;
    }

    if (lastName !== "") {
      errors.lastNameErrorFlag = true;
      errors.lastNameHelperText = lastName;
    }

    if (email !== "") {
      errors.emailErrorFlag = true;
      errors.emailHelperText = email;
    }

    if (password !== "") {
      errors.passwordErrorFlag = true;
      errors.passwordHelperText = password;
    }
    if (confirmPassword !== "") {
      console.log("confirm pass function");
      errors.confirmPasswordErrorFlag = true;
      errors.confirmPasswordHelperText = confirmPassword;
    }
    return errors;
  };

  console.log(formErrors);
  return (
    <>
      <Grid container className="auth-container">
        <Grid item xs={12} md={6} className="auth-box">
          <div className="todo-logo">
            <Logo />
          </div>
          <div className="auth-form-box">
            <div className="auth-heading">
              <CustomHeading title="Sign up" variant="h5" />
            </div>
            <div className="auth-form">
              <form>
                <Grid container>
                  <Grid item md={6} xs={6} sx={{ paddingRight: 2 }}>
                    <CustomTextField
                      variant="standard"
                      margin="normal"
                      autoFocus={true}
                      label="First Name"
                      name="firstName"
                      id="firstName"
                      error={formErrors?.firstNameErrorFlag}
                      helperText={formErrors?.firstNameHelperText}
                      fullWidth={true}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item md={6} xs={6}>
                    <CustomTextField
                      variant="standard"
                      margin="normal"
                      label="Last Name"
                      name="lastName"
                      id="lastName"
                      error={formErrors?.lastNameErrorFlag}
                      helperText={formErrors?.lastNameHelperText}
                      fullWidth={true}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <CustomTextField
                  variant="standard"
                  margin="normal"
                  label="Email Address"
                  name="email"
                  id="email"
                  error={formErrors?.emailErrorFlag}
                  helperText={formErrors?.emailHelperText}
                  fullWidth={true}
                  onChange={handleChange}
                />

                <CustomTextField
                  variant="standard"
                  margin="normal"
                  label="Password"
                  type="password"
                  name="password"
                  id="password"
                  error={formErrors?.passwordErrorFlag}
                  helperText={formErrors?.passwordHelperText}
                  fullWidth={true}
                  onChange={handleChange}
                />

                <CustomTextField
                  variant="standard"
                  margin="normal"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  error={formErrors?.ConfirmPasswordErrorFlag}
                  helperText={formErrors?.confirmPasswordHelperText}
                  fullWidth={true}
                  onChange={handleChange}
                />

                <CustomButton
                  label="Sign Up"
                  fullWidth={true}
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                />
              </form>
            </div>

            <div className="auth-link-box">
              <CustomLink href="/" text="Already have an account? Login" />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
