import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/customButton";
import CustomHeading from "../../../components/customHeading";
import CustomLink from "../../../components/customLink";
import CustomTextField from "../../../components/customTextField";
import Logo from "../../../components/logo";
import {
  isBlankField,
  isValidEmail,
  isValidPassword,
} from "../../../utils/validation";
import "./../style.scss";

const Login = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    token: "",
  };
  const [userValues, setUserValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(userValues));
    // console.log(formErrors);
    setSubmitForm(true);
  };

  useEffect(() => {
    // console.log("submit useEffect: ");

    if (submitForm && Object.keys(formErrors).length === 0) {
      // console.log(userValues);
    }
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
  };

  const validateForm = (values) => {
    const errors = {};
    const email = isValidEmail(values.email) || isBlankField(values.email);
    const password =
      isValidPassword(values.password) || isBlankField(values.password);

    if (email !== "") {
      errors.emailErrorFlag = true;
      errors.emailHelperText = email;
    }

    if (password !== "") {
      errors.passwordErrorFlag = true;
      errors.passwordHelperText = password;
    }
    return errors;
  };
  return (
    <>
      <Grid container className="auth-container">
        <Grid item xs={12} md={5} className="auth-box">
          <div className="todo-logo">
            <Logo />
          </div>
          <div className="auth-form-box">
            <div className="auth-heading">
              <CustomHeading heading="Login" variant="h5" />
            </div>
            <div className="auth-form">
              <form>
                <CustomTextField
                  variant="standard"
                  autoFocus={true}
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
                  label="Password"
                  type="password"
                  name="password"
                  id="password"
                  error={formErrors?.passwordErrorFlag}
                  helperText={formErrors?.passwordHelperText}
                  fullWidth={true}
                  onChange={handleChange}
                />

                <CustomButton
                  label="Submit"
                  fullWidth={true}
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                />
              </form>
            </div>

            <div className="auth-link-box">
              <CustomLink href="signup" text="Don't have an account? Sign Up" />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
