import PropTypes from 'prop-types';
import { LoadMoreButton, Wrapper } from './Button.styled';

const Button = ({ onClick, children }) => {
  return (
    <Wrapper>
      <LoadMoreButton type="button" onClick={onClick}>
        {children}
      </LoadMoreButton>
    </Wrapper>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
