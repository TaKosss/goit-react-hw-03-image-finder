import { createPortal } from 'react-dom';
import { Overlay, ImgModal } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ imageUrl, alt, handleBackdropClick }) => {
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ImgModal>
        <img src={imageUrl} alt={alt} />
      </ImgModal>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
