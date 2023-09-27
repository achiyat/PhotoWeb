import React, { useEffect, useRef, useState } from "react";
import { getPhotoFromAPI } from "../../services/services";
import { ModalBox } from "../ModalBox/modalBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./searchPhotos.css";

export const SearchPhotos = (props) => {
  const searchRef = useRef(null);
  const [images, setImages] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [selectedImage, setSelectedImage] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [onOpenApp, setOnOpenApp] = useState(true);

  // Function to open the modal with the selected image
  const openModal = (image) => {
    setSelectedImage(image);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  const toggleFavorite = (image) => {
    const isFavorite = favorites.some((favImage) => favImage.id === image.id);

    if (isFavorite) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favImage) => favImage.id !== image.id)
      );
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, image]);
    }
  };

  const fetchImages = async (word, _perPage) => {
    try {
      const response = await getPhotoFromAPI(
        `http://localhost:5000/pixabay/images`,
        word,
        _perPage
      );
      setImages(response);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handleSearch = () => {
    // Reset the images and page when a new search is initiated
    setImages([]);
    setPerPage(10);
    fetchImages(searchRef.current.value, 10);
    setShowFavorites(false);
  };

  const handleShowFavorites = () => {
    setShowFavorites(true);
    setImages(favorites);
  };

  const handleLoadMore = () => {
    const newPerPage = perPage + 10;
    setPerPage(newPerPage);
    fetchImages(searchRef.current.value, newPerPage);
  };

  const handleBackToImages = () => {
    fetchImages(searchRef.current.value, perPage);
    setShowFavorites(false);
  };

  useEffect(() => {
    if (showFavorites) {
      setImages(favorites);
    }
  }, [favorites]);

  useEffect(() => {
    if (onOpenApp) {
      fetchImages(searchRef.current.value, perPage);
      setOnOpenApp(false);
    }
  }, [onOpenApp]);

  return (
    <div>
      <header>
        <input ref={searchRef} type="text" placeholder="Search for photos..." />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleShowFavorites}>Show Favorites</button>
      </header>

      <main>
        {images.length === 0 && showFavorites ? (
          <p>No favorite pictures found</p>
        ) : (
          images.map((image) => (
            <div key={image.id} className="image-container">
              <FontAwesomeIcon
                icon={faStar}
                className={`favorite-icon ${
                  favorites.some((favImage) => favImage.id === image.id)
                    ? "favorite"
                    : ""
                }`}
                onClick={() => toggleFavorite(image)}
              />
              <img
                src={image.webformatURL}
                alt={image.tags}
                width="200"
                height="150"
                onClick={() => openModal(image)}
              />
            </div>
          ))
        )}
      </main>

      {selectedImage && <ModalBox image={selectedImage} onClose={closeModal} />}

      <footer>
        {!showFavorites ? (
          <button onClick={handleLoadMore}>Load More Images</button>
        ) : (
          <button onClick={handleBackToImages}>Back</button>
        )}
      </footer>
    </div>
  );
};
