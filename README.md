# ✅ Todo App

A full-stack **Todo Application** built with **React.js**, **Tailwind CSS**, and **Strapi CMS**, designed to help users efficiently manage their daily tasks with real user authentication and persistent data storage.

- 🔗 **Live Demo:** [https://todo-app-eight-lilac-81.vercel.app/](https://todo-app-eight-lilac-81.vercel.app/)
- 🎨 **Figma Design:** [View on Figma](https://www.figma.com/design/oYssuor0PY462obfA7QbtR/Todo-App--Community-?node-id=0-1&t=1GPKr65oKXSDG5sN-0)
- 🗂 **Backend Repo (Strapi):** [https://github.com/raven-mst/Todo-App_Strapi](https://github.com/raven-mst/Todo-App_Strapi)

---

## 📚 Table of Contents

- [✅ Todo App](#-todo-app)
  - [📚 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
  - [🧠 Tech Stack](#-tech-stack)
  - [📂 Project Structure](#-project-structure)
    - [Frontend (`/client`)](#frontend-client)
    - [Backend (`/server`)](#backend-server)
  - [⚙️ Installation \& Setup](#️-installation--setup)
    - [1️⃣ Clone the repository](#1️⃣-clone-the-repository)
    - [2️⃣ Setup Backend (Strapi)](#2️⃣-setup-backend-strapi)
    - [3️⃣ Setup Frontend (React)](#3️⃣-setup-frontend-react)
    - [🧩 Notes](#-notes)
    - [🏆 Performance](#-performance)
    - [👨‍💻 Author](#-author)
    - [📜 License](#-license)

---

## 🚀 Features

- 🔐 **User Authentication** powered by **Strapi**
- 🧾 **Create, Read, Update, and Delete Todos** (CRUD)
- 💾 **Persistent Storage** in Strapi’s default **SQLite database**
- 💡 **Modern and Responsive UI** built with **Tailwind CSS**
- ⚡ **Optimized Frontend Performance** using **Vite**
- 🌙 **Dark and Clean Design** inspired by Figma community templates
- ✅ **Lighthouse Scores:**
  - **Desktop:** Performance 100 / Accessibility 100 / Best Practices 100 / SEO 100
  - **Mobile:** Performance 97 / Accessibility 100 / Best Practices 100 / SEO 100

---

## 🧠 Tech Stack

| Technology            | Purpose                          |
| --------------------- | -------------------------------- |
| **React.js (v19)**    | Frontend UI library              |
| **Vite**              | Fast build tool                  |
| **Tailwind CSS (v4)** | Styling and responsive design    |
| **Formik + Yup**      | Form management and validation   |
| **Strapi (v5)**       | Backend CMS & API for todos/auth |
| **SQLite**            | Default database for Strapi      |
| **React Router v7**   | Client-side routing              |
| **React Icons**       | UI icons set                     |

---

## 📂 Project Structure

### Frontend (`/client`)

    src/
    ├── components/ # Reusable UI components
    ├── contexts/ # Context providers (Auth, Todos)
    ├── layouts/ # Layout components
    ├── pages/ # Pages (Home, Login, Signup, etc.)
    ├── utils/ # API helpers & constants
    ├── App.jsx # Root component with routes
    ├── main.jsx # Entry point
    └── index.css # Global styles

### Backend (`/server`)

    src/
    ├── api/
    │ └── todo/ # Todo collection type (CRUD)
    ├── extensions/
    └── config/
    ├── database.js
    └── server.js

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/Todo-App.git
cd Todo-App
```

### 2️⃣ Setup Backend (Strapi)

```bash
cd server
npm install
npm run develop
```

### 3️⃣ Setup Frontend (React)

```bash
cd ../client
npm install
npm run dev
```

4️⃣ Access the App

```bash
Frontend: http://localhost:5173/
Backend (Strapi Admin): http://localhost:1337/admin
```

---

### 🧩 Notes

- The project now uses Strapi CMS as a full backend for both authentication and todo management.
- Users can sign up, log in, and manage their todos (add, edit, delete).
- Data is persisted in Strapi’s SQLite database.
- This project focuses on combining a modern React frontend with a powerful headless CMS backend.

---

### 🏆 Performance

Achieved **perfect Lighthouse scores** on desktop and **near-perfect on mobile** 💪  
This confirms that the app is **highly optimized, accessible, and SEO-friendly.**

| Metric             | Desktop | Mobile |
| ------------------ | ------- | ------ |
| **Performance**    | 100     | 97     |
| **Accessibility**  | 100     | 100    |
| **Best Practices** | 100     | 100    |
| **SEO**            | 100     | 100    |

---

### 👨‍💻 Author

Mustafa Sayed
Front-End Developer | React.js & TailwindCSS

---

### 📜 License

This project is open-source and available under the MIT License.
