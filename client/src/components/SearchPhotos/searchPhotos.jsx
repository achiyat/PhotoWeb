import React, { useEffect, useRef, useState } from "react";
import { getPhotoFromAPI } from "../../services/services";
import { ModalBox } from "../ModalBox/modalBox";
import "./searchPhotos.css";

export const SearchPhotos = (props) => {
  const searchRef = useRef(null);
  const [images, setImages] = useState([]);
  const [perPage, setPerPage] = useState(10);

  const [selectedImage, setSelectedImage] = useState(null);

  // Function to open the modal with the selected image
  const openModal = (image) => {
    setSelectedImage(image);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  const fetchImages = async (word) => {
    try {
      const formattedWord = word.replace(/\s+/g, "+");
      const response = await getPhotoFromAPI(
        `http://localhost:5000/pixabay/images`,
        formattedWord,
        perPage
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
  };

  useEffect(() => {
    if (images.length === 0) {
      console.log("useEffect_1-IN");
      // Fetch images when the component mounts or when the search term or page changes
      fetchImages(searchRef.current.value);
    } else {
      console.log("useEffect_1-NOT IN");
    }
  }, [images]);

  useEffect(() => {
    if (images.length !== 0 && images.length < perPage) {
      console.log("useEffect_2-IN");
      // Fetch images when the component mounts or when the search term or page changes
      fetchImages(searchRef.current.value);
    } else {
      console.log("useEffect_2-NOT IN");
    }
  }, [perPage]);

  return (
    <div>
      <header>
        <input ref={searchRef} type="text" placeholder="Search for photos..." />
        <button onClick={handleSearch}>Search</button>
      </header>
      <main>
        {images.map((image) => (
          <img
            key={image.id} // Use image.id as the unique key
            src={image.webformatURL}
            alt={image.tags}
            width="200"
            height="150"
            onClick={() => openModal(image)} // Open the modal when clicked
          />
        ))}
      </main>

      {/* Display the modal when an image is selected */}
      {selectedImage && <ModalBox image={selectedImage} onClose={closeModal} />}

      <footer>
        <button onClick={() => setPerPage((prevPerPage) => prevPerPage + 10)}>
          Load More Images
        </button>
      </footer>
    </div>
  );
};
