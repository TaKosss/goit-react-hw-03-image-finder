import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ImgModal } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl, alt } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ImgModal>
          <img src={imageUrl} alt={alt} />
        </ImgModal>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
