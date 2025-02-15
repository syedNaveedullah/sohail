import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import ForgotPassword from "./ForgotPassword";
import { useMutation } from "@tanstack/react-query";
import { loginUser, emailVerification } from "../api/fetching-apis";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./pay.css";

const LoginModal = ({ show, handleClose }) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  // State for input fields
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  // Email verification mutation
  const emailVerify = useMutation({
    mutationFn: emailVerification,
    mutationKey: ["emailVerification"],
  });

  // Login mutation
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: loginUser,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading alert
    Swal.fire({
      title: "Processing...",
      text: "Please wait while we log you in.",
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await mutateAsync({ Email, Password });

      // Success alert
      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 403) {
        try {
          await emailVerify.mutateAsync();

          Swal.fire({
            title: "Verification Required",
            text: "A verification link has been sent to your email.",
            icon: "warning",
            confirmButtonText: "OK",
          });
        } catch (emailError) {
          Swal.fire({
            title: "Error",
            text: emailError.response?.data?.message || "Something went wrong.",
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "Login Failed",
          text: error.response?.data?.message || "Invalid credentials!",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="p-4">
          <Modal.Title className="text-center mb-4">
            <h3>Login</h3>
          </Modal.Title>

          {/* <Button
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

          {isError && <p style={{ color: "red" }}>Login failed. Try again.</p>} */}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
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
                style={{color:'#d4af37'}}
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
                background: "#D4AF37",
                border: "none",
              }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center">
              <span>Don't have an account? </span>
              <Button variant="link" className="p-0" style={{color:'#d4af37'}} onClick={() => navigate("/signup")}>
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
