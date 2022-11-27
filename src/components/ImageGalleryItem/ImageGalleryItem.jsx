import PropTypes from 'prop-types';
import { Component } from 'react';
import Modal from 'components/Modal';
import { ImageGalleryCard, ImageGalleryImg } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = { showModal: false };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.onCloseModal();
    }
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.onCloseModal();
    }
  };
  currentImgClickHandler = e => {
    this.setState({ showModal: true });
  };

  render() {
    const { imageUrl, alt, id, largeImageURL } = this.props;
    const { showModal } = this.state;

    return (
      <ImageGalleryCard>
        <ImageGalleryImg
          src={imageUrl}
          alt={alt}
          id={id}
          onClick={this.currentImgClickHandler}
        />
        {showModal && (
          <Modal
            handleBackdropClick={this.handleBackdropClick}
            imageUrl={largeImageURL}
            alt={alt}
          />
        )}
      </ImageGalleryCard>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
