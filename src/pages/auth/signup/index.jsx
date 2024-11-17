import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
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
} from "../../../services/utils/validation";
import "./../style.scss";
import { userSignUp } from "../../../services/apiService/auth";
import CollapseAlert from "../../../components/alert";
import { SIGNUP_HEADING, SIGNUP_SUCCESS_MSG } from "../../../constants";
import BackdropLoader from "../../../components/backdrop";
import { Link } from "react-router-dom";

const Signup = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [userValues, setUserValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [loader, setLoader] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(userValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && Object.keys(formErrors).length === 0) {
      setAlertOptions({
        open: false,
        message: "",
      });
      const signup = async () => {
        setLoader(true);
        try {
          const res = await userSignUp({
            firstName: userValues?.firstName,
            lastName: userValues?.lastName,
            email: userValues?.email,
            password: userValues?.password,
          });
          if (res) {
            setLoader(false);
            setUserValues(initialState);
            setAlertOptions({
              open: true,
              severity: "success",
              message: SIGNUP_SUCCESS_MSG,
            });
          }
        } catch (err) {
          setLoader(false);
          setAlertOptions({
            open: true,
            severity: "error",
            message: err.message,
          });
        }
      };
      signup();
    }
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
  };

  const validateForm = (values) => {
    const errors = {};
    for (const [key, value] of Object.entries(values)) {
      let errMsg = "";
      switch (key) {
        case "firstName":
        case "lastName":
          errMsg = isValidName(value) || isBlankField(value);
          break;
        case "email":
          errMsg = isValidEmail(value) || isBlankField(value);
          break;
        case "password":
          errMsg = isValidPassword(value) || isBlankField(value);
          break;
        case "confirmPassword":
          errMsg =
            isValidConfirmPassword(values.password, value) ||
            isBlankField(value);
          break;
        default:
          break;
      }
      if (errMsg) errors[key] = errMsg;
    }
    return errors;
  };

  const closeAlert = () => {
    setAlertOptions({ ...alertOptions, open: false });
  };

  return (
    <>
      <Grid container className="auth-container">
        <Grid item xs={12} md={6} className="auth-box">
          <div className="todo-logo">
            <Logo />
          </div>
          <div className="auth-form-box">
            <div className="auth-heading">
              <CustomHeading title={SIGNUP_HEADING} variant="h5" />
            </div>
            {alertOptions?.open && (
              <CollapseAlert
                open={alertOptions.open}
                severity={alertOptions.severity}
                message={alertOptions.message}
                handleClose={closeAlert}
              />
            )}
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
                      value={userValues?.firstName}
                      error={formErrors?.firstName ? true : false}
                      helperText={formErrors?.firstName}
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
                      value={userValues?.lastName}
                      error={formErrors?.lastName ? true : false}
                      helperText={formErrors?.lastName}
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
                  value={userValues?.email}
                  error={formErrors?.email ? true : false}
                  helperText={formErrors?.email}
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
                  value={userValues?.password}
                  error={formErrors?.password ? true : false}
                  helperText={formErrors?.password}
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
                  value={userValues?.confirmPassword}
                  error={formErrors?.confirmPassword ? true : false}
                  helperText={formErrors?.confirmPassword}
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
      {loader && <BackdropLoader open={loader} />}
    </>
  );
};

export default Signup;
