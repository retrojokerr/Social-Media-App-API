# Social Media App API

A RESTful API for a social media platform with features like user authentication, post management, comments, protected routes, and real-time notifications using Socket.io.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Posts](#posts)
  - [Protected Routes](#protected-routes)
- [Running Real-Time Chat](#Running-Real-Time-Chat)
- [License](#licenses)

## Features

- **User Authentication**: Secure JWT-based authentication.
- **Post Management**: Create, view, and manage posts.
- **Comments**: Add comments to posts with real-time notifications.
- **Protected Routes**: Access restricted resources securely.
- **Real-time Chat**: WebSocket-powered messaging and notifications.
- **Frontend Integration**: Serves static frontend files.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Real-time**: Socket.io
- **Frontend**: Static files served from `/client`

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a locally installed MongoDB instance.
- A `.env` file with the necessary environment variables (see [Environment Variables](#environment-variables)).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/social-media-app-api.git
   cd social-media-app-api
2. Install dependencies:
    ```bash
    npm start
3. Set up environment variables (see [Environment Variables](#environment-variables)).

### Running the Application

1. Start the server
    ```bash
    npm start
2. Access the API at `http://localhost:5000`

## Environment Variables
Create a `.env` file in the root directory and include the following:
```sh
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```
Replace `your-mongodb-uri` and `your-jwt-secret` with your MongoDB connection string and a secret key for JWTs.

## API Endpoints
### Authentication
- **POST** `/api/auth/signup`
    - **Description**: Register a new user.
    - **Body**:
    ```bash
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
- **POST** `/api/auth/login`
    - **Description**: Log in an existing user.
    - **Body**:
    ```bash
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
### Posts
- **GET** `/api/posts`
    - **Description**: Get a list of all posts.
- **POST** `/api/posts`
    - **Description**: Create a new post (authenticated).
    - **Headers**: 
    ```bash
    {
      "Authorization": "Bearer <token>"
    }
    ```
    - **Body**: 
    ```bash
    {
      "text": "This is a new post",
      "mediaUrl": "http://example.com/image.jpg"
    }
    ```
- **POST** `/api/comments`
    - **Description**: Add a comment to a post (authenticated).
    - **Headers**: 
    ```bash
    {
      "Authorization": "Bearer <token>"
    }
    ``` 
    - **Body**: 
    ```bash
    {
      "text": "Great post!",
      "postId": "<post-id>"
    }
    ```
### Protected Routes
- **GET** `/api/protected`
    - **Description**: Access protected route (authenticated).
    - **Headers**: 
    ```bash
    {
      "Authorization": "Bearer <token>"
    }
    ```
## Running Real-Time Chat
1. **Start the server**  
   Ensure the server is running using the command:
   ```bash
   npm start
   ```
2. **Connect the client(s) using the Frontend:**  
   Use a simple HTTP server to serve the `client` folder.:
   ```bash
   npx serve
   ```
   Or use the Live Server extension in VS Code.

3. **Open in Browser:**  
   - Navigate to `http://localhost:5000` (or your hosting URL).
   - Use multiple clients (e.g., browser tabs or tools like Postman with a WebSocket add-on).

![Screenshot 2024-11-23 063924](https://github.com/user-attachments/assets/ff3ba19b-1042-4af2-8781-fbad7340e523)


### Licences
This project is licensed under the MIT License.


