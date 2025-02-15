import React from "react";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./pay.css";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../api/fetching-apis";
import Swal from "sweetalert2";

const ResetPassword = ({ show, handleClose }) => {

  const [password, setPassword] = useState("");
   
  const params = useParams();

  // Reset password mutation
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Password reset successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleClose(); // Close the modal after success
    },
    onError: (error) => {
      console.error("Reset password failed:", error);
      Swal.fire({
        title: "Failed!",
        text: error.response?.data?.message || "Something went wrong",
        icon: "warning",
        confirmButtonText: "OK",
      });
    },
  });

  // Handle password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  // Reset password function
  const sendPasswordResetLink = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!password) {
      Swal.fire({
        title: "Error",
        text: "Please enter a new password.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    mutation.mutate({
      token: params.token, 
      newPassword: password,
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-4">
        <Modal.Title className="text-center mb-4">
          <h3>Reset Password</h3>
        </Modal.Title>

        <Form onSubmit={sendPasswordResetLink}>
          <Form.Group className="mb-3">
            <Form.Label>Enter New Password
            </Form.Label>
            <Form.Control           
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={handlePasswordChange} />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100 mb-3"
            type="submit"
            style={{
              borderRadius: "20px",
              background: "#d4af37",
              border: "none",
            }}
          >
            RESET PASSWORD
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ResetPassword;
