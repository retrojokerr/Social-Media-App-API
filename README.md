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
- [Running the Deployed Link](#running-the-deployed-link)
  - [Using Real-Time Chat](#using-real-time-chat)
  - [API Calls Using Postman](#api-calls-using-postman)
    - [Authentication](#authentication)
    - [Post Management](#post-management)
    - [Comments](#comments)
    - [Protected Routes](#protected-routes)
    - [Error Responses](#error-responses)
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

## Running Locally

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
### Running Real-Time Chat Locally
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

# Running the deployed link

## Using Real-Time Chat

1. Prerequisites:
   - Browser with multiple tabs/windows.

2. Steps to Test Real-Time Chat:
   1. Open Multiple Clients
      - Open two or more browser tabs/windows and navigate to `https://www.chattydaadi.fun`
   2. Navigate to the Chat Section.
   3. Send Messages:
      - In one browser tab, type a message in the chat interface and send it.
      - Check that the message appears instantly in all open tabs or browser windows.
   4. Test Notifications:
      - Ensure real-time notifications are displayed when comments are made on the post (through API testing softwares like Postman).
   5. Simulate Multi-User Interaction:
      - Open a third browser or session to simulate a new user joining the chat.
      - Send messages from all active clients and verify they sync in real time.

![image](https://github.com/user-attachments/assets/eff651b5-672d-4869-8840-cf1a4bec3e6e)

     
## API Calls Using Postman
### Authentication

1. Register a New User
   - Endpoint: `POST https://www.chattydaadi.fun/api/auth/signup`
   - Body (JSON):
     ```bash
     {
        "name": "Name Surname",
        "email": "name@example.com",
        "password": "password123"
     }
    ```
  - Description: Registers a new user.
    
2. Log In an Existing User
   - Endpoint: `POST https://www.chattydaadi.fun/api/auth/login`
   - Body (JSON):
     ```bash
     {
        "email": "name@example.com",
        "password": "password123"
     }
    ```
  - Description: Authenticates a user and returns a token.

### Post Management

1. Get All Posts
   - Endpoint: `GET https://www.chattydaadi.fun/api/posts`
   - Description: Fetches all posts.
  
2. Create a New Post
   - Endpoint: `POST https://www.chattydaadi.fun/api/posts`
   - Headers:
     ```bash
     {
        "Authorization": "Bearer <token>"
     }
     ```
   - Body (JSON):
     ```bash
     {
        "text": "This is a new post",
        "mediaUrl": "http://example.com/image.jpg"
     }
    ```
  - Description: Creates a new post (requires authentication).

### Comments

1. Add a Comment
   - Endpoint: `POST https://www.chattydaadi.fun/api/comments`
   - Headers:
     ```bash
     {
        "Authorization": "Bearer <token>"
     }
     ```
   - Body (JSON):
     ```bash
     {
        "text": "Great post!",
        "postId": "<post-id>"
     }
     ```
   - Description: Adds a comment to a post (requires authentication).

### Protected Routes

1. Access Protected Data
   - Endpoint: `GET https://www.chattydaadi.fun/api/protected`
   - Headers:
     ```bash
     {
        "Authorization": "Bearer <token>"
     }
     ```
   - Description: Fetches data from a protected route.

### Error Responses
If you encounter any error:
  - Ensure your Authorization header contains a valid JWT token.
  - Verify the postId or mediaUrl values exist and are properly formatted.
  - Check your environment variables on the server (for debugging authentication issues).



   
### Licences
This project is licensed under the MIT License.


