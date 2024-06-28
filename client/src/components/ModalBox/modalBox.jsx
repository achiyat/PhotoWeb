// modalBox.jsx
import React from "react";
import "./modalBox.css";

export const ModalBox = ({ image, onClose }) => {
  if (!image) {
    // Return null if image is not provided
    return null;
  }

  // Function to open the image URL in a new tab
  const openImageURL = () => {
    window.open(image.pageURL, "_blank");
  };

  return (
    <div className="modalBox-container" onClick={onClose}>
      <div className="modalBox-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <img
            src={image.webformatURL}
            alt={image.tags}
            className="modalBox-image"
            style={{
              width: image.webformatHeight > 600 ? "400px" : "100%",
            }}
            onClick={openImageURL} // Open the image URL in a new tab
          />
          <div className="modalBox-userInfo">
            <img
              src={image.userImageURL} // User's image URL
              alt={image.user} // User's name
              className="modalBox-userImage"
            />
            <span className="modalBox-userName">{image.user}</span>
          </div>
        </div>
        <div className="modalBox-imageDetails">
          <p>Tags: {image.tags}</p>
          <p>Views: {image.views}</p>
          <p>Downloads: {image.downloads}</p>
          <p>Likes: {image.likes}</p>
          <p>Comments: {image.comments}</p>
        </div>
      </div>
    </div>
  );
};
