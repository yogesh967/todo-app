import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CustomButton from "../../../components/button";
import CustomHeading from "../../../components/heading";
import CustomLink from "../../../components/link";
import CustomTextField from "../../../components/textField";
import Logo from "../../../components/logo";
import {
  isBlankField,
  isValidEmail,
  isValidPassword,
} from "../../../services/utils/validation";
import "./../style.scss";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../../services/apiService/auth";
import CollapseAlert from "../../../components/alert";
import { clearSession } from "../../../services/utils/ManageSessions";
import { AuthContext } from "../../../context/AuthContext";
import BackdropLoader from "../../../components/backdrop";

const Login = () => {
  const initialState = {
    email: "yogesh@gmail.com",
    password: "123456789",
  };

  const [userValues, setUserValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);
  const [loader, setLoader] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    open: false,
    message: "",
  });

  const navigate = useNavigate();

  const { login, logout } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(userValues));
    setSubmitForm(true);
  };

  const closeAlert = () => {
    setAlertOptions({ ...alertOptions, open: false });
  };

  useEffect(() => {
    logout();
  }, []);

  useEffect(() => {
    if (submitForm && Object.keys(formErrors).length === 0) {
      setAlertOptions({
        open: false,
        message: "",
      });
      const handleLogin = async () => {
        setLoader(true);
        try {
          const res = await userLogin(userValues);
          if (res?.token) {
            // setSession("token", res?.token);
            setLoader(false);
            login(res?.token);
            navigate("/todo");
          }
        } catch (err) {
          setLoader(false);
          setAlertOptions({ open: true, message: err.message });
        }
      };
      handleLogin();
    }
  }, [formErrors]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
  };

  const validateForm = (values) => {
    const errors = {};
    for (const [key, value] of Object.entries(values)) {
      let errMsg;
      switch (key) {
        case "email":
          errMsg = isValidEmail(value) || isBlankField(value);
          break;
        case "password":
          errMsg = isValidPassword(value) || isBlankField(value);
          break;
        default:
          break;
      }
      if (errMsg) errors[key] = errMsg;
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
              <CustomHeading title="Login" variant="h5" />
            </div>
            <div className="alertBox">
              {alertOptions?.open && (
                <CollapseAlert
                  open={alertOptions.open}
                  severity="error"
                  message={alertOptions.message}
                  handleClose={closeAlert}
                />
              )}
            </div>
            <div className="auth-form">
              <form>
                <CustomTextField
                  variant="standard"
                  margin="normal"
                  autoFocus={true}
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
                  value={userValues.password}
                  error={formErrors?.password ? true : false}
                  helperText={formErrors?.password}
                  fullWidth={true}
                  onChange={handleChange}
                />

                <CustomButton
                  label="Login"
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
      {loader && <BackdropLoader open={loader} />}
    </>
  );
};

export default Login;
