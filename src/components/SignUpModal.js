import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc"; 
import "./pay.css"; 

import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../api/fetching-apis";
import { useNavigate } from "react-router-dom";


const SignUpModal = ({ show, handleClose }) => {
  
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const navigate = useNavigate();

  // useMutation hook for signup API
  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      // alert("Signup successful! Please login.");
      navigate("/login");
      console.log(data);
    },
    onError: (error) => {
      console.error("Signup failed:", error);
      // alert("Signup failed. Try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    mutation.mutate({ FullName, Email, Password, Phone });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-4">
        <Modal.Title className="text-center mb-4">
          <h3>Sign Up</h3>
        </Modal.Title>

        <Button
          variant="outline-danger"
          className="w-100 mb-4 d-flex align-items-center justify-content-center"
          style={{
            borderRadius: "20px",
            border: "1px solid #ddd",
            padding: "10px",
          }}>
          <FcGoogle size={20} className="me-2" />
          Sign Up with Gmail
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
            }}>
            OR
          </span>
        </div>
        {mutation.isError && <p style={{ color: "red" }}>Signup failed. Try again.</p>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                {/* <Form.Control type="text" placeholder="Enter full name" /> */}
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  value={FullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Phone Number"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
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

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              label={
                <span>
                  By signing up, you agree with{" "}
                  <a href="#terms" className="text-primary">
                    terms and conditions
                  </a>{" "}
                  of the service
                </span>
              }
              required
            />
          </Form.Group>

          <Button
            type="submit"
            disabled={mutation.isLoading}
            variant="primary"
            className="w-100 mb-3"
            style={{
              borderRadius: "20px",
              background: "linear-gradient(to right, #f2711d, #f3ac1b)",
              border: "none",

            }}>
            {/* SIGN UP */}
            {mutation.isLoading ? "Signing up..." : "SIGN UP"}
          </Button>

          <div className="text-center">
            <span>Already have an account? </span>
            <Button variant="link" className="p-0">
              LOGIN
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;