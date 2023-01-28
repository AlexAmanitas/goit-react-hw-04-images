import { LoadMoreButton } from './Button.styled';

const Button = ({ page, onClick }) => {
  let pageNumber = page;
  const handleClick = () => {
    pageNumber += 1;
    onClick(pageNumber);
  };

  return (
    <LoadMoreButton type="button" onClick={handleClick}>
      Load More
    </LoadMoreButton>
  );
};

export default Button;
