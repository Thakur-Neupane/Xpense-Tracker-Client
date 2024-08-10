import Modal from "react-bootstrap/Modal";
import { useUser } from "../UserContext";

export const CustomModal = ({ children, title }) => {
  const { setShowForm, showForm } = useUser();
  return (
    <>
      <Modal
        show={showForm}
        onHide={setShowForm}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};
