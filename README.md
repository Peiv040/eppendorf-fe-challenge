# FE Challenge

This project is a frontend-backend web application for the frontend developer challenge. It demonstrates:

- A sortable table/list generated from a static JSON dataset.
- A registration form with field validation.
- Separation of frontend (React + TypeScript) and backend (Node.js + Express) into distinct services using Docker and Docker Compose.

Note: For simplicity, both the frontend and backend are included in a single repository. In a real-world project, these would typically be maintained in separate repositories to improve modularity, scalability, and team collaboration.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)

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
| GET    | `/devices`   | Returns the JSON dataset.       |
| POST   | `/register`  | Validates and registers a user. |

## Running the Application

### Development

1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo/eppendorf-fe-challenge.git
   cd eppendorf-fe-challenge
   ```

2. Create .env files for frontend and backend each like shown in .env.example

3. Start the application using Docker Compose:
   ```bash
   docker compose -f "docker-compose-development.yml" up --build
   ```

4. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:3001](http://localhost:3001)

### Production

1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo/eppendorf-fe-challenge.git
   cd eppendorf-fe-challenge
   ```

2. Create .env files for frontend and backend and fill each like shown in .env.example

3. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:3001](http://localhost:3001)