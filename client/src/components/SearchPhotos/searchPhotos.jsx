// searchPhotos.jsx
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

  const openModal = (image) => {
    setSelectedImage(image);
  };

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
        "http://localhost:5000/pixabay/images",
        word,
        _perPage
      );
      setImages(response);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handleSearch = () => {
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
    <div className="searchPhotos-container">
      <header className="searchPhotos-header">
        <input
          className="searchPhotos-input"
          ref={searchRef}
          type="text"
          placeholder="Search for photos..."
        />
        <button className="searchPhotos-button" onClick={handleSearch}>
          Search
        </button>
        <button className="searchPhotos-button" onClick={handleShowFavorites}>
          Show Favorites
        </button>
      </header>

      <main className="searchPhotos-main">
        {images.length === 0 && showFavorites ? (
          <p className="searchPhotos-note">No favorite pictures found</p>
        ) : (
          images.map((image) => (
            <div key={image.id} className="searchPhotos-imageContainer">
              <FontAwesomeIcon
                icon={faStar}
                className="searchPhotos-favoriteIcon"
                style={{
                  color: favorites.some((favImage) => favImage.id === image.id)
                    ? "yellow"
                    : "white",
                }}
                onClick={() => toggleFavorite(image)}
              />
              <img
                src={image.webformatURL}
                alt={image.tags}
                onClick={() => openModal(image)}
                className="searchPhotos-image"
                style={{
                  objectFit: image.webformatHeight > 600 ? "initial" : "cover",
                }}
              />
            </div>
          ))
        )}
      </main>

      {selectedImage && <ModalBox image={selectedImage} onClose={closeModal} />}

      <footer className="searchPhotos-footer">
        {!showFavorites ? (
          <button className="searchPhotos-button" onClick={handleLoadMore}>
            Load More Images
          </button>
        ) : (
          <button className="searchPhotos-button" onClick={handleBackToImages}>
            Back
          </button>
        )}
      </footer>
    </div>
  );
};
