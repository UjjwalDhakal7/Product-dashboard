import { ReactNode, useState } from 'react';
import './index.css';
import Sidebar from '#components/Sidebar';
import Button from '#components/Button';
import ModalComponent from '#components/Modal';

interface ContainerProps {
  children: ReactNode;
}

const ContainerComponent = ({ children }: ContainerProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="wrapper">
      <div className="container">
        <header>
          <h1>Dashboard</h1>
          <Button onClick={handleOpenModal} classname='button'>Add Product</Button>
        </header>
        <div className="main-wrap">
          <div className="sidebar"><Sidebar /></div>
          <div className="main">
            <ModalComponent isOpen={showModal} onRequestClose={handleCloseModal} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerComponent;
