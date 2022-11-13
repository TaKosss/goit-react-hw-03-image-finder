import PropTypes from 'prop-types';
import { ImageGalleryCard, ImageGalleryImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ imageUrl, alt, id, onClick }) => {
  return (
    <ImageGalleryCard>
      <ImageGalleryImg
        src={imageUrl}
        alt={alt}
        id={id}
        onClick={e => onClick(e.target.id)}
      />
    </ImageGalleryCard>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
