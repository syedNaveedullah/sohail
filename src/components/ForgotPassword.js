import React from "react";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./pay.css";
import { useMutation } from "@tanstack/react-query";
import { forgetPasswordLink } from "../api/fetching-apis";
import Swal from "sweetalert2"; // Import SweetAlert2


const ForgotPassword = ({show, handleClose}) => {

    const [Email, setEmail] = useState("");

    const handleChange = (e) => { 
        setEmail(e.target.value);
    }


    //sending email to the user mutation
    const mutation = useMutation({
      mutationFn: forgetPasswordLink,
      onMutate: () => {
        // Show loading Swal before the request is sent
        Swal.fire({
          title: "Processing...",
          text: "Please wait while we reset your password.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      },
      onSuccess: () => {
        // console.log(data);
        Swal.fire({
          title: "Sent Email Successfully",
          text: `Email Sent Successfully, Please Check Your Email ${Email}`,
          icon: "success",
          confirmButtonText: "OK",
        });
      },
      onError: (error) => {
        console.error("Email failed:", error);
        Swal.fire({
          title: "failed!",
          text: error.response.data.message,
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    });


    const handleSumit = (e) => {
        e.preventDefault();
        // Add your code here
        mutation.mutate(Email);
    }


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-4">
        <Modal.Title className="text-center mb-4">
          <h3>Recover Password</h3>
        </Modal.Title>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Enter your Email and instructions will be sent to you!
            </Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={handleChange} />
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleSumit}
            className="w-100 mb-3"
            style={{
              borderRadius: "20px",
              background: "#d4af37",
              border: "none",
            }}
          >
            RESET
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPassword;
