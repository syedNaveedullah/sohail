import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import ForgotPassword from "./ForgotPassword";
import { useMutation } from "@tanstack/react-query";
import { loginUser, emailVerification } from "../api/fetching-apis";
import { useNavigate } from "react-router-dom";
import "./pay.css";





const LoginModal = ({ show, handleClose }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate(); 
  // const handleAuthModalShow = useState ()

  //login
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");



    // send verification link

    const emailVerify=useMutation({
      mutationFn:emailVerification,
      mutationKey:["emailVerification"]
    })
   

// login
const {mutateAsync, isError,isLoading} = useMutation({
  mutationFn: loginUser,
});

// const handleSubmit = (e) => {
//   e.preventDefault();
//   mutateAsync({ Email, Password }).then((data)=>{
//     // console.log(data)
//     alert("Login successful!");
//     navigate("/dashboard");
//   }).catch((error)=>{
//     console.log(error)
//     if(error.response.status==="403"){
//        emailVerify.mutateAsync().then(()=>{
//             alert("Verification link sent to your email!")
//           }).catch((error)=>{
//             alert(error.response?.data?.message)
//           })
//     }
//   });
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await mutateAsync({ Email, Password });
    alert("Login successful!");
    navigate("/dashboard");
  } catch (error) {
    console.log(error);
    if (error.response?.status === 403) {
      try {
        await emailVerify.mutateAsync();
        alert("Verification link sent to your email!");
      } catch (emailError) {
        alert(emailError.response?.data?.message);
      }
    }
  }
};




// // login******************************************************************
// const mutation = useMutation({
//   mutationFn: loginUser,
//   onSuccess: (data) => {
//     localStorage.setItem("token", data.token); // Save token
//     alert("Login successful!");
//     navigate("/dashboard");
//   },
//   // onError: () => alert("Invalid credentials!"),
// });

// const handleSubmit = (e) => {
//   e.preventDefault();
//   mutation.mutate({ Email, Password });
// };
// *************************************************************



  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="p-4">
          <Modal.Title className="text-center mb-4">
            <h3>Login</h3>
          </Modal.Title>

          <Button
            variant="outline-danger"
            className="w-100 mb-4 d-flex align-items-center justify-content-center"
            style={{
              borderRadius: "20px",
              border: "1px solid #ddd",
              padding: "10px",
            }}
          >
            <FcGoogle size={20} className="me-2" />
            Login with Gmail
          </Button>

          <div className="text-center position-relative my-4">
            <hr />
            <span
              className="bg-white px-2"
              style={{
                position: "absolute",
                top: "-12px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              OR
            </span>
          </div>

          {isError && <p style={{ color: "red" }}>Login failed. Try again.</p>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" 
               value={Email}
               onChange={(e) => setEmail(e.target.value)}
               required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                 type="password"
                 placeholder="Password"
                 value={Password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
              />
            </Form.Group>

            <div className="text-end mb-4">
              <Button
                variant="link"
                className="p-0"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </Button>
            </div>

            <Button
              variant="primary"
              className="w-100 mb-3"
              type="submit"
              disabled={isLoading}
              style={{
                borderRadius: "20px",
                background: "linear-gradient(to right, #f2711d, #f3ac1b)",
                border: "none",
              }}
            >
              {/* LOGIN */}
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center">
              <span>Don't have an account? </span>
              <Button variant="link" className="p-0"  onClick={() => navigate("/signup")}>
                SIGN UP
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ForgotPassword
        show={showForgotPassword}
        handleClose={() => setShowForgotPassword(false)}
      />
    </>
  );
  };

export default LoginModal;
