import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./pay.css";

const ForgotPassword = ({ show, handleClose }) => {
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
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Button
            variant="primary"
            className="w-100 mb-3"
            style={{
              borderRadius: "20px",
              background: "linear-gradient(to right, #f2711d, #f3ac1b)",
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
