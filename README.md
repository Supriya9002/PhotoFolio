# PhotoFolio

PhotoFolio is an online photo album application built with React. It allows users to upload, organize, and share their digital photos seamlessly. The app is designed to be user-friendly, with a visually appealing interface that encourages users to explore and manage their photo collections effortlessly.

## Table of Contents

- [Objective](#objective)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Structure](#api-structure)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Objective

The primary goal of PhotoFolio is to provide users with an easy-to-use platform for managing their digital photos. The app allows users to create albums, upload images, preview them, and download them as needed.

## Features

- **Album Management:** Users can create, view, and delete albums.
- **Image Management:** Users can add, edit, delete, and preview images within albums.
- **Image Preview:** Images can be viewed in a carousel mode with next, previous, and close functionalities.
- **Search Functionality:** Users can search and filter images within an album.
- **Data Persistence:** All albums and images are stored in Firestore for persistent access.
- **Toast Notifications:** Real-time notifications for async actions and errors using `react-toastify`.
- **Loading State:** A loading spinner is displayed while data is being fetched using `react-spinner-material`.

## Technologies Used

- **React:** For building the user interface.
- **Firebase Firestore:** For storing albums and images.
- **React Spinner Material:** For displaying loading indicators.
- **React Toastify:** For displaying toast notifications.
- **CSS/SCSS:** For styling components.

## Getting Started

To get started with PhotoFolio, follow these steps:

### Prerequisites

- Node.js installed on your machine.
- Firebase account set up for Firestore.

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Supriya9002/PhotoFolio
    cd photofolio
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up Firebase:**
    - Create a Firebase project and Firestore database.
    - Add your Firebase configuration to the project.

4. **Run the application:**
    ```bash
    npm start
    ```

    The app will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Available Scripts

- **`npm start`:** Runs the app in development mode.
- **`npm run build`:** Builds the app for production.
- **`npm run test`:** Launches the test runner.

## Project Structure

The PhotoFolio app consists of the following components:

- **App:** Contains the main structure, including the Navbar and routing.
- **Navbar:** Displays the application logo and navigation links.
- **AlbumForm:** Allows users to create new albums.
- **AlbumsList:** Displays the list of albums fetched from Firestore.
- **ImageForm:** Allows users to add or update images within an album.
- **ImagesList:** Displays the list of images within a selected album.
- **Imagess:** Displays images in a modal window for preview.

### Component Structure

- **App**
  - **Navbar**
  - **AlbumsList**
    - **AlbumForm** (conditionally rendered)
    - **ImagesList** (conditionally rendered)
      - **ImageForm** (conditionally rendered)
      - **Imagess** (conditionally rendered)
  
## API Structure

The Firebase Firestore database is structured as follows:

- **Collections:**
  - `name` - Stores all album data.
  - `imageArr` - Stores all image data associated with specific albums.

## Future Enhancements

- **User Authentication:** Implement user login and registration functionality.
- **Image Sharing:** Allow users to share albums and images with others via links or social media.
- **Album Privacy:** Add privacy settings for albums (e.g., public, private, shared).
- **Batch Upload:** Enable users to upload multiple images at once.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
