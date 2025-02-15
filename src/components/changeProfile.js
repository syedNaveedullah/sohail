import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { updateProfile } from "../api/fetching-apis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useProfile from "../hooks/callProfile";

const FullNameModal = ({ show, handleClose }) => {
  const [FullName, setFullName] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["changeFullName"],
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "You have successfully changed your full name",
        icon: "success",
      });
      queryClient.invalidateQueries(["userProfile"]); // ✅ Refresh profile data
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
    mutation.mutate({ FullName });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
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

export default FullNameModal;
