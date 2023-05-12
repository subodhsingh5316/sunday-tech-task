import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import labImage from "../../assest/images/labImage.jpg";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { FormHelperText, IconButton, OutlinedInput } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./login.module.css";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  return (
    <div className={styles.loginPage}>
      <div className={styles.imageContainer}>
        <img src={labImage} alt="Lab image" />
      </div>
      <div className={styles.container}>
        <h2>Welcome</h2>
        <h3>Signup to Lab monitoring system</h3>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Username can't be blank";
            } else if (
              !/^(?=.{3,10}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
                values.username,
              )
            ) {
              errors.username = "Invalid username format";
            }
            if (!values.email) {
              errors.email = "Email can't be blank";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password can't be blank";
            } else if (
              !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
                values.password,
              )
            ) {
              errors.password =
                "Password should have atleast one digit, one special character  ";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            // add the toast messages
            localStorage.setItem("username", values.username);
            localStorage.setItem("email", values.email);
            localStorage.setItem("isLoggedIn", true);
            setSubmitting(false);
            const users =  JSON.parse(localStorage.getItem("users")) || [];
            const userExist = users.find(({ email }) => email === values.email);
            console.log(users, userExist);
            if(userExist) {
                toast.warning("User Already Exist");
            }
            else{
                const user = {username:values.username,email:values.email,password:values.password}
                users.push(user)
                localStorage.setItem('users', JSON.stringify(users));
                toast.success("Signup Successfully");
                navigate('/');
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form
              method="POST"
              action=""
              className={styles.loginForm}
              onSubmit={handleSubmit}
            >
              <TextField
                required
                id="username"
                label="username"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                error={errors.username && touched.username}
                helperText={
                  errors.username && touched.username && errors.username
                }
              />
              <TextField
                required
                id="email"
                label="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
              />

              <FormControl variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type={showPassword ? "text" : "password"}
                  error={errors.password && touched.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {errors.password && touched.password && (
                  <FormHelperText error id="password-error">
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              <button type="submit" disabled={isSubmitting}>
                Sign up
              </button>
            </form>
          )}
        </Formik>

        <p className={styles.signupLink}>
          Already have a account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;