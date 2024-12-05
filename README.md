# Eppendorf FE Challenge

This project is a frontend-backend web application for the Eppendorf Frontend Developer Challenge. It demonstrates:

- A sortable table/list generated from a static JSON dataset.
- A registration form with field validation.
- Separation of frontend (React + TypeScript) and backend (Node.js + Express) into distinct services using Docker and Docker Compose.

Note: For simplicity, both the frontend and backend are included in a single repository. In a real-world project, these would typically be maintained in separate repositories to improve modularity, scalability, and team collaboration.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [API Details](#api-details)
- [Development](#development)
- [Production](#production)
- [Testing](#testing)

## Technologies Used

### Frontend
- React + TypeScript
- Vite for development and production builds
- Docker for containerization
- Material UI for UI components
- Vitest for testing

### Backend
- Node.js + Express
- Middleware: CORS, body-parser
- Validation with **validator.js**
- Password encryption with **bcrypt**
- Docker for containerization

## Setup Instructions

### Prerequisites
Ensure the following are installed:
- Docker and Docker Compose
- Node.js (if running without Docker)

### Running the Application

1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo/eppendorf-fe-challenge.git
   cd eppendorf-fe-challenge
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:3001](http://localhost:3001)

## Project Structure

```
eppendorf-fe-challenge/
│
├── frontend/                # Frontend application
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── ...
│
├── backend/                 # Backend application
│   ├── app.js               # Main backend file
│   ├── routes/
│   ├── package.json
│   ├── Dockerfile
│   └── ...
│
├── docker-compose.yml       # Docker Compose file for orchestration
└── README.md
```

## API Details

### Backend Endpoints

| Method | Endpoint     | Description                     |
|--------|--------------|---------------------------------|
| GET    | `/data`      | Returns the JSON dataset.       |
| POST   | `/register`  | Validates and registers a user. |

## Development

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Access at [http://localhost:3000](http://localhost:3000).

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm run start
   ```

4. Access at [http://localhost:3001](http://localhost:3001).

---

## Production

To build and run the application for production:
1. Update the `docker-compose.yml` file with production settings (e.g., environment variables, optimized builds).
2. Run:
   ```bash
   docker-compose up --build
   ```

## Testing

### Frontend
- Run tests using Vitest:
  ```bash
  cd frontend
  npm run test
  ```

### Backend
- Implement unit tests using a testing framework like **Jest** or **Mocha** (not yet included).
