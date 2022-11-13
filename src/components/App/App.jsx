import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import ErrorMessege from 'components/ErrorMessege';

import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from './App.styled';
import { fetchImage } from 'services/fetchImage';

export default class App extends Component {
  state = {
    imageQuery: '',
    pageNumber: 1,
    totalPages: 0,
    status: 'idle',
    images: [],
    currentImage: {},
    error: '',
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { imageQuery, pageNumber } = this.state;
    const currentImageQuery = imageQuery;
    const currentPage = pageNumber;

    if (
      prevState.imageQuery !== currentImageQuery ||
      prevState.pageNumber !== currentPage
    ) {
      this.setState({ status: 'pending' });
      fetchImage(currentImageQuery, currentPage)
        .then(data => {
          if (data.hits.length === 0) {
            return Promise.reject(
              new Error(`Cannot find ${currentImageQuery}`)
            );
          }
          const totalPages = Math.ceil(data.totalHits / 12);

          const requiredHits = data.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => {
              return { id, webformatURL, largeImageURL, tags };
            }
          );
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...requiredHits],
              totalPages: totalPages,
            };
          });
        })
        .then(() => {
          this.setState({ status: 'done', error: '' });
        })
        .catch(error => {
          this.setState({ status: 'error', error: error.ErrorMessege });
        });
      return;
    }
  }

  handleSearchbarSubmit = value => {
    this.setState({ imageQuery: value, pageNumber: 1, images: [] });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => {
      return { pageNumber: prevState.pageNumber + 1 };
    });
  };

  onGalleryClickHandle = imageId => {
    const currentImage = this.state.images.find(item => {
      return item.id === Number(imageId);
    });
    this.setState({
      currentImage: currentImage,
      showModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal, currentImage, totalPages, pageNumber, images, status } =
      this.state;

    return (
      <>
        <Box>
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          {images.length !== 0 && (
            <ImageGallery images={images} onClick={this.onGalleryClickHandle} />
          )}

          {status === 'pending' && <Loader />}
          {totalPages > pageNumber && (
            <Button onClick={this.onLoadMoreClick}>Load more</Button>
          )}
          {showModal && (
            <Modal
              imageUrl={currentImage.largeImageURL}
              alt={currentImage.tags}
              onCloseModal={this.onCloseModal}
            />
          )}

          {status === 'error' && <ErrorMessege />}
          <ToastContainer autoClose={3000} />
        </Box>
      </>
    );
  }
}
