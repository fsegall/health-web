import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, Toast } from './styles';
const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast hasDescription>
        <FiAlertCircle size={20} />
        <div>
          <strong>Aconteceu alguma coisa</strong>
          <p>Não foi possível fazer login na aplicação</p>
          <button type="button">
            <FiXCircle size={18} />
          </button>
        </div>
      </Toast>
      <Toast type="success" hasDescription={false}>
        <FiAlertCircle size={20} />
        <div>
          <strong>Supimpa!</strong>
          <button type="button">
            <FiXCircle size={18} />
          </button>
        </div>
      </Toast>
      <Toast hasDescription type="error">
        <FiAlertCircle size={20} />
        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login na aplicação</p>
          <button type="button">
            <FiXCircle size={18} />
          </button>
        </div>
      </Toast>
    </Container>
  );
};

export default ToastContainer;
