[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Mesto Backend Project
### link: https://github.com/SuperAlex2013/express-mesto-gha
## Technologies Used:
- Express
- Node.js
- MongoDB
- Postman

## Features:
### User Management
- User registration
- User authentication (login)
- Update user information
- Update avatar
- Retrieve list of users
- Retrieve user by ID
- Fetch current user's details

<<<<<<< HEAD
Mesto Backend Project
Technologies Used:
Express
Node.js
MongoDB
Postman
Features:
User Management

User registration
User authentication (login)
Update user information
Update avatar
Retrieve list of users
Retrieve user by ID
Fetch current user's details
Card Management

Fetch list of cards
Create a new card
Delete a card
Like a card
Unlike a card
Utilities

Central error handling
Input validation
About the Project:
This server application is designed to store and exchange files with the Mesto web application.

=======
### Card Management
- Fetch list of cards
- Create a new card
- Delete a card
- Like a card
- Unlike a card

### Utilities
- Central error handling
- Input validation

## About the Project:
This server application is designed to store and exchange files with the Mesto web application.

>>>>>>> d54c61c93589487b8fc381704edfd4c502ed4102
Users can register and log in using their email and password. The authentication token is valid for 7 days. Each user's account includes fields like name, about, avatar, email, and password. These fields can be set during registration; if not, defaults are set for name, about, and avatar. Users can update the name, about, and avatar fields after registration.

Cards can be created with fields such as name, link (image URL), owner (creator's ID), createdAt (creation date), and likes (given by users). These cards can be created, deleted, and liked. Inputs like URLs or email addresses are validated.

<<<<<<< HEAD
Directory Structure:
/routes - Contains router files.
/controllers - Holds user and card controller files.
=======
## Directory Structure:
- `/routes` - Contains router files.
- `/controllers` - Holds user and card controller files.
- `/models` - Stores user and card schema descriptions.

> Note: Other directories are auxiliary and can be added by developers based on the project's requirements.

## Getting Started:
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies with `npm install`.
4. Use the following commands to start the server:
   - `npm run start` - Starts the server.
   - `npm run dev` - Starts the server with hot-reload.

>>>>>>> d54c61c93589487b8fc381704edfd4c502ed4102
/models - Stores user and card schema descriptions.
Note: Other directories are auxiliary and can be added by developers based on the project's requirements.

Getting Started:
Clone the repository.
Navigate to the project directory.
Install dependencies with npm install.
Use the following commands to start the server:
npm run start - Starts the server.
npm run dev - Starts the server with hot-reload.
<<<<<<< HEAD
=======
# link
https://github.com/SuperAlex2013/express-mesto-gha
>>>>>>> d54c61c93589487b8fc381704edfd4c502ed4102
