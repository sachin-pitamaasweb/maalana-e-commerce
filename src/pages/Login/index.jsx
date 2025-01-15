import React, { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../utils/apis";
import ForgetPasswordModal from "../../components/ForgetPasswordModal/index.jsx";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { gapi } from "gapi-script";
import "./style.css";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const [modalOpen, setModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [messageType, setMessageType] = useState("info");
    const [isSubmitted, setIsSubmitted] = useState(false);  

    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const initializeGapi = async () => {
            try {
                await gapi.load("client:auth2");
                await gapi.client.init({
                    clientId: '591116137411-agcrqt053njgmgn1tvsc8pjk5q2mr1ka.apps.googleusercontent.com',
                    scope: "profile email",
                });
            } catch (error) {
                console.error("Error initializing Google API:", error);
            }
        };

        initializeGapi();
    }, []);

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

                if (responseData.success) {
                    setSnackbar({ open: true, message: "Login successful!", severity: "success" });
                    login(responseData.user._id);
                    navigate("/products");
                } else {
                    setSnackbar({ open: true, message: "Invalid credentials. Please try again.", severity: "error" });
                }
            } catch (error) {
                console.error("Error during login:", error);
                setSnackbar({ open: true, message: "An error occurred. Please try again later.", severity: "error" });
            }
        },
    });

    const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

    const handleGoogleLogin = async () => {
        if (!gapi.auth2 || !gapi.auth2.getAuthInstance()) {
            console.error("Google Auth instance is not initialized.");
            setStatusMessage("Google Login Failed!");
            setMessageType("error");
            setIsSubmitted(true);
            return;
        }

        const auth2 = gapi.auth2.getAuthInstance();
        try {
            const googleUser = await auth2.signIn();
            const profile = googleUser.getBasicProfile();
            const token = googleUser.getAuthResponse().id_token;

            console.log("User Info:", {
                name: profile.getName(),
                email: profile.getEmail(),
                token,
            });

            // Send token to the backend for verification
            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            const result = await response.json();

            if (result.success) {
                console.log("Backend authenticated successfully:", result);
                setStatusMessage("Google Login Successful!");
                setMessageType("success");
                setIsSubmitted(true);
                navigate('/products');
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error("Google Sign In Failed:", error);
            setStatusMessage("Google Login Failed!");
            setMessageType("error");
            setIsSubmitted(true);
        }
    };


    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const navigateToSignup = () => navigate("/signup");

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
                                aria-label="Email Address"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="error-text">{formik.errors.email}</div>
                            )}
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
                                aria-label="Password"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle"
                                aria-label="Toggle Password Visibility"
                            >
                                {showPassword ? (
                                    <VisibilityOff fontSize="small" sx={{ color: "gray" }} />
                                ) : (
                                    <Visibility fontSize="small" sx={{ color: "gray" }} />
                                )}
                            </span>
                            {formik.touched.password && formik.errors.password && (
                                <div className="error-text">{formik.errors.password}</div>
                            )}
                        </div>
                        <div className="forgot-password" onClick={handleModalOpen}>Forgot Password?</div>
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
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="google-login-btn"
                            aria-label="Login with Google"
                        >
                            <GoogleIcon /> Login with Google
                        </button>
                        <div className="signup">
                            Don't have an account? <span className="signup-link" onClick={navigateToSignup}>Sign Up</span>
                        </div>
                    </form>
                </motion.div>
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            {modalOpen && <ForgetPasswordModal open={modalOpen} handleClose={handleModalClose} />}
        </>
    );
}
