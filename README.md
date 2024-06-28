# 💻 Photo Search and Management App

Here is a video presentation of the project:
[Download the video](https://github.com/achiyat/PhotoWeb/raw/main/client/src/Media/Video/presentation.mp4)

The project was tested and scored: ⭐⭐⭐⭐⭐

## 📖 Overview

This project is a responsive web application built with React that allows users to search for photos from the Pixabay API, view detailed information about each photo in a modal, and manage their favorite photos. The application features dynamic loading of more photos and a fully responsive design to ensure a seamless user experience across different devices.

## 📝 Requirements

### Display and User Interface
- Enabling an input field for users to search for images by keywords.
- Retrieve and display images from the Pixabay API based on the search term.
- Option for users to mark photos as favorites.
- A button to show only the favorite photos.
- Saving the favorite even after searching for another word.
- Displaying a modal with detailed information about the image when clicking on an image.
- Load button for more photos.

### Backend Integration
- Creating an Express server to handle API requests to Pixabay.
- Using Axios to fetch data from the Pixabay API.

### Responsive Design
- The app is fully responsive and works well on desktop, tablet, and mobile devices.

## 🛠️ Technologies Used

- **Frontend:** React, FontAwesome for icons, CSS for styling
- **Backend:** Node.js, Express
- **API:** Pixabay API

# Image Gallery

<p align="center">
  <img src="https://github.com/achiyat/PhotoWeb/blob/main/client/src/Media/Image/home.jpg" width="350"/>
  <img src="https://github.com/achiyat/PhotoWeb/blob/main/client/src/Media/Image/favorites.jpg" width="350"/>
  <img src="https://github.com/achiyat/PhotoWeb/blob/main/client/src/Media/Image/responsive.jpg" width="300"/>
</p>

## 📥 Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/achiyat/PhotoWeb.git
    cd PhotoWeb
    ```

2. **Install dependencies for the frontend:**
    ```sh
    cd client
    npm install
    ```

3. **Install dependencies for the backend:**
    ```sh
    cd ../server
    npm install
    ```

4. **Set up environment variables:**
    - Create a `.env` file in the `server` directory with the following content:
    ```plaintext
    PIXABAY_API_KEY=your_pixabay_api_key
    PORT=8000
    ```

5. **Start the backend server:**
    ```sh
    cd server
    npm start
    ```

6. **Start the React application:**
    ```sh
    cd ../client
    npm start
    ```

7. **Open the application:**
    - Navigate to `http://localhost:3000` in your web browser.

## 📡 API

The application uses the [Pixabay API](https://pixabay.com/api/docs/) to fetch photos. You need to sign up for an API key from Pixabay and add it to your `.env` file in the backend directory.

## 💡 Usage

1. **Search for Photos:**
    - Use the search bar at the top to input keywords and search for photos.

2. **View Photo Details:**
    - Click on any photo to open a modal with detailed information about the photo.

3. **Manage Favorites:**
    - Click the star icon on a photo to add it to your favorites.
    - Click the `Show Favorites` button to view all your favorite photos.

4. **Load More Photos:**
    - Click the `Load More Images` button at the bottom to fetch and display more photos.

## 🗂️ Project Structure
```
PhotoWeb/
│
├── server/
│ ├── node_modules/
│ ├── .env
│ ├── package.json
│ ├── server.js
│ └── ...
│
├── client/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── SearchPhotos/
│ │ │ │ ├── searchPhotos.jsx
│ │ │ │ ├── searchPhotos.css
│ │ │ ├── ModalBox/
│ │ │ │ ├── modalBox.jsx
│ │ │ │ ├── modalBox.css
│ │ ├── services/
│ │ │ ├── services.js
│ │ ├── App.jsx
│ │ ├── index.jsx
│ ├── package.json
│ └── ...
│
└── README.md
```

## 📞 Contact

📧 **Email:** [achiya308@gmail.com](mailto:achiya308@gmail.com)

🔗 **LinkedIn:** [Achiya Tzuriel](https://www.linkedin.com/in/achiya-tzuriel/)

🔗 **Project Link:** [PhotoWeb](https://github.com/achiyat/PhotoWeb)

Thanks for visiting my GitHub profile! 😊

**Achiya Tzuriel**
