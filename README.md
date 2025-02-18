# Debo Online Learning Platform

Welcome to **Debo Online Learning**, a full-stack online learning platform built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js). This project is designed to offer a seamless learning experience for students and instructors.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)

## Project Structure

```
DeboOnlineLearning/
│
├── client/        # Frontend (React + Vite)
├── node_modules/
├── /        # Backend (Node.js + Express)
├── config.env           # Environment variables
├── package.json   # Backend dependencies
├── package-lock.json
├── README.md
```

- **Root Folder:** Contains the backend code (Node.js, Express, MongoDB).
- **Client Folder:** Contains the frontend code (React.js, Vite, Tailwind CSS).

## Features

✅ User authentication (JWT-based)
✅ Student dashboard to resume learning & track progress
✅ Instructor dashboard to create and manage courses
✅ Admin panel for managing users and content
✅ Course enrollment, video lessons, and quizzes
✅ Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **File Uploads:** Multer
- **State Management:** React Context API

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/dawe014/DeboOnlineLearning.git
cd DeboOnlineLearning
```

2. **Install backend dependencies:**

```bash
npm install
```

3. **Install frontend dependencies:**

```bash
cd client
npm install
```

4. **Create a config.env file in the root folder:**

```
NODE_ENV=development
PORT=3000
USER=<your-username>
DATABASE=<your-mongodb-connection-string>
PASSWORD=<your-password>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=7d
CHAPA_AUTH_KEY=<your-chapa-auth-key>
```

5. **Run the backend:**

```bash
npm run dev
```

6. **Run the frontend:**

```bash
cd client
npm run dev
```

## Usage

- Open the app in your browser.
- Sign up as a student, instructor, or admin.
- Enroll in courses, create new courses, and manage user activities.

## Environment Variables

Make sure to configure the `config.env` file in the root directory with the required variables.

---

Made with ❤️ by **Dawit Tamiru**

