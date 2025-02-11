import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./pay.css";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../api/fetching-apis";

const Email = ({ show, handleClose }) => {
  const params = useParams();

  const { mutateAsync } = useMutation({
    mutationFn: verifyEmail,
    mutationKey: ["verifyEmail"], //from here we can see the data in developer tool
  });

  const handleVerify = async () => {
    mutateAsync(params.token)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-4">
        <Modal.Title className="text-center mb-4">
          <h3>Email Verification</h3>
        </Modal.Title>

        <Form>
          <Button
            variant="primary"
            className="w-100 mb-3"
            onClick={handleVerify}
            style={{
              borderRadius: "20px",
              background: "linear-gradient(to right, #f2711d, #f3ac1b)",
              border: "none",
            }}>
            Verify Email
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Email;
