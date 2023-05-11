import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import labImage from "../../assest/images/labImage.jpg";
import { InputLabel, FormControl, Box } from "@mui/material";
import { useState } from "react";
import { FormHelperText, IconButton, OutlinedInput } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./login.module.css";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const navigate = useNavigate();
    return (
        <Box className={styles.loginPage}>
            <div className={styles.imageContainer}>
                <img src={labImage} alt="Lab image" />
            </div>
            <div className={styles.container}>
                <h2>Welcome</h2>
                <h3>Login to Lab monitoring system</h3>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validate={(values) => {
                        const errors = {};
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
                                "Required 8 plus character password needs uppercase, lowercase, special character, and number.";
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log("subodh")

                        const users = JSON.parse(localStorage.getItem("users")) || [];
                        const userExist = users.find(({ email }) => email === values.email);
                        try {
                            if (
                                userExist && userExist.password === values.password
                            ) {
                                //  toast message
                                toast.success("Login Successfully");
                                localStorage.setItem("isLoggedIn", true);
                                //redirected to user listing screen
                                navigate("/user");
                            } else {
                                toast.error("Invalid Credentials");
                                localStorage.setItem("isLoggedIn", false);
                            }
                            setSubmitting(false);
                        } catch (error) {
                            toast.error("Something went wrong");
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
                                Login
                            </button>
                        </form>
                    )}
                </Formik>
                <p className={styles.forgotPasswordLink}>
                    <a href="">Forgot Password?</a>
                </p>

                <p className={styles.signupLink}>
                    Need an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </Box>
    );
}

export default Login;