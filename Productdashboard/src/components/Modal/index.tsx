import ReactModal from 'react-modal';
import AddProduct from '#views/AddProduct';
import './index.css';

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ModalComponent = ({ isOpen, onRequestClose }: ModalComponentProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      preventScroll={false}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <button className="close-button" onClick={onRequestClose}>Close</button>
      <AddProduct onClose={onRequestClose} />
    </ReactModal>
  );
};

export default ModalComponent;
