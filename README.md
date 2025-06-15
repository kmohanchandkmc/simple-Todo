# Todo List Application

This is a simple and intuitive Todo List application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to create, read, update, and delete tasks, as well as mark them as complete.

## Features

- **Create, Read, Update, Delete (CRUD)** tasks
- **Mark tasks as complete**
- **Filter tasks** by "All," "Active," and "Completed"
- **Responsive design** for a seamless experience on all devices

## Technologies Used

- **Frontend:**
  - React
  - Axios
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express.js
  - MySQL
- **Database:**
  - MySQL

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm installed
- MySQL installed and running

### Installation

1. **Clone the repo**
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. **Install NPM packages for the client**
   ```sh
   cd client
   npm install
   ```
3. **Install NPM packages for the server**
   ```sh
   cd ../server
   npm install
   ```
4. **Set up the database**
   - Create a new database in MySQL named `todo`.
   - Update the database connection details in `server/index.js` if needed.

### Running the Application

1. **Start the backend server**
   ```sh
   cd server
   npm start
   ```
2. **Start the frontend development server**
   ```sh
t   cd client
   npm run dev
   ```

The application will be available at `http://localhost:5173`.