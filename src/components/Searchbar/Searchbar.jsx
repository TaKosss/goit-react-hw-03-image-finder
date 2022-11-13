import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from 'react-icons/im';
import { SearchbarField, Form, Input, Button } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleNameChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      query: e.currentTarget.elements.query.value,
    });

    if (this.state.query.trim() === '') {
      toast.error('Please enter a word!');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchbarField>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ImSearch />
          </Button>

          <Input
            name="query"
            type="text"
            value={this.state.query}
            onChange={this.handleNameChange}
            placeholder="Search images and photos"
          />
        </Form>
      </SearchbarField>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
