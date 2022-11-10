import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import { Component } from 'react';

export default class App extends Component {
  state = {
    showModal: false,
  };

  handleSearchbarSubmit = galleryItem => {
    console.log(galleryItem);
  };

  toggleModal = () => {
    this.state(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { showModal } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        {showModal && <Modal onClose={this.toggleModal} />}
      </div>
    );
  }
}
