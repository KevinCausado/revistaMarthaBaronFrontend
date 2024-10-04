import { Modal, Button } from 'react-bootstrap';
import { AiOutlineWarning } from 'react-icons/ai'; // Ícono de advertencia

const FailedLoginModal = ({ showError, setShowError, errorMessage }) => {
  return (
    <Modal
      show={showError}
      onHide={() => setShowError(false)}
      centered
      backdrop="static" // No permite cerrar el modal al hacer clic fuera de él
      animation={true}  // Activa animación suave
      className="text-center" // Centra el texto en el modal
    >
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>
          <AiOutlineWarning size={24} style={{ marginRight: '10px' }} />
          Error de Inicio de Sesión
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-danger">{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger" // Cambiamos el estilo del botón a peligroso
          onClick={() => setShowError(false)}
          className="mx-auto" // Centra el botón
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FailedLoginModal;
