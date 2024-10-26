// import React from 'react'
// import { Helmet } from 'react-helmet';
// import CommonForm from '../../components/CommonForm/index.jsx';


// const Login = () => {
//     return (
//         <>
//             <Helmet>
//                 <title>Maalana-Login</title>
//             </Helmet>
//             <CommonForm
//                 title='Login'
//                 isValue={true}
//             />
//         </>
//     )
// }

// export default Login

import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Snackbar, Alert, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../utils/apis";
import ForgetPasswordModal from "../../components/ForgetPasswordModal/index.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import "./style.css";
import { Helmet } from "react-helmet";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [modalOpen, setModalOpen] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate(); // Initialize navigate

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (formData) => {
            try {
                const responseData = await loginUser({
                    email: formData.email,
                    password: formData.password,
                });

                console.log("Login response:", responseData);
                if (responseData.success) {
                    console.log("Login successful:", responseData);
                    setSnackbarSeverity("success");
                    setSnackbarMessage("Login successful!");
                    login(responseData.user._id); // Mark the user as authenticated
                    navigate("/products"); // Redirect to products page
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Invalid credentials. Please try again.");
                }
            } catch (error) {
                console.error("Error during login:", error);
                setSnackbarSeverity("error");
                setSnackbarMessage("An error occurred. Please try again later.");
            } finally {
                setSnackbarOpen(true);
            }
        },
    });

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleGoogleLogin = () => {
        console.log("Google login clicked");
    };

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const navigateToSignup = () => navigate('/signup');

    return (
        <>
         <Helmet>
            <title>Maalana-Login</title>
            <meta name="description" content="Login Page" />
            <link rel="canonical" href="/login" />
         </Helmet>
            <div className="container-login">
                <motion.div
                    className="login-box"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1
                        className="title"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        Maalana Login
                    </motion.h1>
                    <form onSubmit={formik.handleSubmit} className="form">
                        <div className="input-container">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="input-field"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error-text">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="input-field"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className={formik.touched.password && formik.errors.password ? "error-icon" : "password-toggle"}
                            >
                                {showPassword ? (
                                    <VisibilityOff fontSize="small" sx={{ color: "gray", marginTop: "6px" }} />
                                ) : (
                                    <Visibility fontSize="small" sx={{ color: "gray", marginTop: "6px" }} />
                                )}
                            </span>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error-text">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className="forgot-password" onClick={handleModalOpen}>Forget Password?</div>
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <button type="submit" className="login-btn">
                                    Login
                                </button>
                            </motion.div>
                        </AnimatePresence>
                        <hr className="divider" />
                        <button type="button" onClick={handleGoogleLogin} className="google-login-btn">
                            <GoogleIcon /> Login with Google
                        </button>
                        <div className="signup">
                            Don't have an account? <span className="signup-link" onClick={navigateToSignup}>Sign Up</span>
                        </div>
                    </form>
                </motion.div>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            {modalOpen && <ForgetPasswordModal open={modalOpen} handleClose={handleModalClose} />}
        </>
    );
}
