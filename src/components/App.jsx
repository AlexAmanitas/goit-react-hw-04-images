import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import fetchPictures from './pictureApiService';
import SearchBar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

Notiflix.Notify.init({
  position: 'left-top',
  cssAnimationStyle: 'zoom',
  fontSize: '20px',
});

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [modalURL, setModalURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);
    try {
      const findPictures = fetchPictures(searchQuery, pageNumber);
      setLoadMore(true);
      findPictures.then(res => {
        console.log(res);
        if (res.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setLoadMore(false);
        }

        if (res.length < 12) {
          setLoadMore(false);
        }
        setPictures([...pictures, ...res]);
      });
    } catch (error) {
      // setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, pageNumber, loadMore]);

  const formSubmitHandler = query => {
    setSearchQuery(query);
    setPageNumber(1);
    setPictures([]);
    // localStorage.setItem('pictures', JSON.stringify(this.state.pictures));
  };

  const imageClickHandler = url => {
    console.log('url', url);
    setModalURL(url);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(showModal => {
      return !showModal;
    });
    console.log(showModal);
  };

  return (
    <div>
      <SearchBar onSubmit={formSubmitHandler} />
      <div className="gallery-wrap">
        <ImageGallery>
          {pictures.map(picture => (
            <ImageGalleryItem
              key={picture.id}
              picture={picture}
              onClick={imageClickHandler}
            ></ImageGalleryItem>
          ))}
        </ImageGallery>
        {loadMore && (
          <Button onClick={setPageNumber} page={pageNumber}></Button>
        )}
      </div>
      {isLoading && <Loader />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalURL} alt={pictures.tags} />
        </Modal>
      )}
    </div>
  );
};
