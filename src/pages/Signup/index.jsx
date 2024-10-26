import React from 'react';
import { Helmet } from 'react-helmet';
import CommonForm from '../../components/CommonForm/index.jsx';

const Signup = () => {
  return (
    <>
      <Helmet>
        <title>Maalana-Signup</title>
      </Helmet>
      <CommonForm
        title='Sign Up'
      />
    </>
  );
};

export default Signup;

// import { useState } from "react";
// import { Snackbar, Alert } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import GoogleIcon from "@mui/icons-material/Google";
// import { motion, AnimatePresence } from "framer-motion";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useAuth } from "../../context/AuthContext";
// import { registerUser } from "../../utils/apis";
// import { useNavigate } from "react-router-dom";

// import "./style.css";

// const validationSchema = Yup.object({
//   firstName: Yup.string().required("First name is required"),
//   lastName: Yup.string().required("Last name is required"),
//   companyName: Yup.string().required("Company name is required"),
//   email: Yup.string().email("Invalid email address").required("Email is required"),
//   phoneNumber: Yup.string().min(10, "Phone number must be at least 10 digits").required("Phone number is required"),
//   password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   message: Yup.string(),
// });

// export default function SignupComponent() {
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       companyName: "",
//       email: "",
//       phoneNumber: "",
//       password: "",
//       message: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (formData) => {
//       setIsSubmitting(true);
//       try {
//         const responseData = await registerUser({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           mobileNumber: formData.phoneNumber,
//           password: formData.password,
//         });

//         if (responseData.success) {
//           setSnackbarSeverity("success");
//           setSnackbarMessage("User registered successfully. Please check your email for verification.");
//           login(responseData.user._id);
//           navigate(`/profile/${responseData.user._id}`, { state: { id: responseData.user._id } });
//         } else {
//           setSnackbarSeverity("error");
//           setSnackbarMessage(responseData.message || "An error occurred. Please try again later.");
//         }
//       } catch (error) {
//         console.error("Error during registration:", error);
//         setSnackbarSeverity("error");
//         setSnackbarMessage("An error occurred. Please try again later.");
//       } finally {
//         setSnackbarOpen(true);
//         setIsSubmitting(false);
//       }
//     },
//   });

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleGoogleLogin = () => {
//     console.log("Google signup clicked");
//     // Google login implementation goes here
//   };

//   return (
//     <>
//       <div className="container-signup">
//         <motion.div
//           className="signup-box"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <motion.h1
//             className="title"
//             initial={{ scale: 0.5 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 260, damping: 20 }}
//           >
//             Maalana Signup
//           </motion.h1>
//           <form onSubmit={formik.handleSubmit} className="form">
//             <div className="row">
//               <div className="input-container">
//                 <input
//                   type="text"
//                   name="firstName"
//                   placeholder="First Name"
//                   className="input-field"
//                   value={formik.values.firstName}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   required
//                 />
//                 {formik.touched.firstName && formik.errors.firstName ? (
//                   <div className="error-text">{formik.errors.firstName}</div>
//                 ) : null}
//               </div>
//               <div className="input-container">
//                 <input
//                   type="text"
//                   name="lastName"
//                   placeholder="Last Name"
//                   className="input-field"
//                   value={formik.values.lastName}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   required
//                 />
//                 {formik.touched.lastName && formik.errors.lastName ? (
//                   <div className="error-text">{formik.errors.lastName}</div>
//                 ) : null}
//               </div>
//             </div>
//             <div className="input-container">
//               <input
//                 type="text"
//                 name="companyName"
//                 placeholder="Company Name"
//                 className="input-field"
//                 value={formik.values.companyName}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 required
//               />
//               {formik.touched.companyName && formik.errors.companyName ? (
//                 <div className="error-text">{formik.errors.companyName}</div>
//               ) : null}
//             </div>
//             <div className="input-container">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 className="input-field"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 required
//               />
//               {formik.touched.email && formik.errors.email ? (
//                 <div className="error-text">{formik.errors.email}</div>
//               ) : null}
//             </div>
//             <div className="input-container">
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 placeholder="Phone Number"
//                 className="input-field"
//                 value={formik.values.phoneNumber}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 required
//               />
//               {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
//                 <div className="error-text">{formik.errors.phoneNumber}</div>
//               ) : null}
//             </div>
//             <div className="input-container">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 className="input-field"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 required
//               />
//               {formik.touched.password && formik.errors.password ? (
//                 <div className="error-text">{formik.errors.password}</div>
//               ) : null}
//               <span className={formik.touched.password && formik.errors.password ? "error-icon-toggle" : "password-toggle"} onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? (
//                   <VisibilityOff fontSize="small" sx={{ color: "gray", marginTop: "6px" }} />
//                 ) : (
//                   <Visibility fontSize="small" sx={{ color: "gray", marginTop: "6px" }} />
//                 )}
//               </span>
//             </div>
//             <AnimatePresence>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <button type="submit" className="signup-btn" disabled={isSubmitting}>
//                   {isSubmitting ? "Signing Up..." : "Sign Up"}
//                 </button>
//               </motion.div>
//             </AnimatePresence>
//             <hr className="divider" />
//             <button type="button" onClick={handleGoogleLogin} className="google-signup-btn">
//               <GoogleIcon /> Sign Up with Google
//             </button>
//           </form>
//         </motion.div>
//       </div>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }
