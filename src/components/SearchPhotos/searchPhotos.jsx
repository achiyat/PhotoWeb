import React, { useEffect, useState } from "react";
import { getPhotoFromAPI } from "../../services/services";
import { buildApiUrl } from "../../Backend";
import { ModalBox } from "../ModalBox/modalBox";
import "./searchPhotos.css";

export const SearchPhotos = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  // const searchRef = useRef(null);
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

  const fetchImages = async () => {
    try {
      const formattedWord = searchTerm.replace(/\s+/g, "+");
      console.log(formattedWord, perPage);
      let endpoint = await buildApiUrl(formattedWord, perPage);
      console.log(endpoint);
      const response = await getPhotoFromAPI(endpoint);
      console.log(response);
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
    // console.log("useEffect_1");
    // console.log(images);
    // console.log(images.length === 0);
    if (images.length === 0) {
      console.log("useEffect_1-IN");
      // Fetch images when the component mounts or when the search term or page changes
      fetchImages();
    } else {
      console.log("useEffect_1-NOT IN");
    }
  }, [images]);

  useEffect(() => {
    // console.log("useEffect_2");
    console.log(images.length !== 0, images.length, "<", perPage);
    // console.log(images.length !== 0 && images.length < perPage);
    if (images.length !== 0 && images.length < perPage) {
      console.log("useEffect_2-IN");
      // Fetch images when the component mounts or when the search term or page changes
      fetchImages();
    } else {
      console.log("useEffect_2-NOT IN");
    }
  }, [perPage]);

  return (
    <div>
      <header>
        <input
          type="text"
          placeholder="Search for photos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
