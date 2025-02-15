import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { changePassword } from "../api/fetching-apis";

const ChangePasswordModal = ({ show, handleClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const mutation = useMutation({
    mutationFn: changePassword,
    mutationKey: ["changePassword"],
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "You have successfully changed your password",
        icon: "success",
      });
      handleClose();
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.response.data.message,
        icon: "error",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      Swal.fire({
        title: "Empty Fields",
        text: "Please fill in all fields",
        icon: "error",
      });
      return;
    }
    mutation.mutate({ oldPassword, newPassword });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="warning">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
