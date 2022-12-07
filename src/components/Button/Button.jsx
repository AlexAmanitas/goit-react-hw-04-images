import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

const Button = props => {
  let pageNumber = props.page;
  const handleClick = evt => {
    console.log(evt);
    pageNumber += 1;
    props.onClick(pageNumber);
  };

  return (
    <LoadMoreButton type="button" onClick={handleClick}>
      Load More
    </LoadMoreButton>
  );
};

export default Button;

Button.propTypes = {
  props: PropTypes.shape({
    page: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
};
