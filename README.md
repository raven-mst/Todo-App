# ✅ Todo App

A modern and responsive **Todo App** built with **React.js** and **Tailwind CSS**, designed to help users organize and manage their daily tasks efficiently.  
This project features **authentication with Clerk**, and uses **local storage** to save todos — no backend required.

🔗 **Live Demo:** [https://todo-app-eight-lilac-81.vercel.app/](https://todo-app-eight-lilac-81.vercel.app/)  
🎨 **Figma Design:** [View on Figma](https://www.figma.com/design/oYssuor0PY462obfA7QbtR/Todo-App--Community-?node-id=0-1&t=1GPKr65oKXSDG5sN-0)

---

## 📚 Table of Contents

- [✅ Todo App](#-todo-app)
  - [📚 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
  - [🧠 Tech Stack](#-tech-stack)
  - [📂 Project Structure](#-project-structure)
  - [⚙️ Installation \& Setup](#️-installation--setup)
  - [🧩 Notes](#-notes)
  - [🏆 Performance](#-performance)
  - [👨‍💻 Author](#-author)
  - [📜 License](#-license)

---

## 🚀 Features

- 🔐 **User Authentication** powered by [Clerk](https://clerk.com/)
- 🧾 **Form Validation** using **Formik** + **Yup**
- 💾 **Local Storage** integration (no external database)
- 💡 **Clean and Responsive UI** built with **Tailwind CSS**
- ⚡ **Optimized Performance** with **Vite**
- 🌙 **Dark Modern Theme** inspired by the Figma community design
- ✅ **Lighthouse Scores:**
  - **Desktop:** Performance 100 / Accessibility 100 / Best Practices 100 / SEO 100
  - **Mobile:** Performance 97 / Accessibility 100 / Best Practices 100 / SEO 100

---

## 🧠 Tech Stack

| Technology            | Purpose                        |
| --------------------- | ------------------------------ |
| **React.js (v19)**    | Frontend UI library            |
| **Vite**              | Fast build tool                |
| **Tailwind CSS (v4)** | Styling and responsive design  |
| **Formik + Yup**      | Form management and validation |
| **Clerk**             | Authentication                 |
| **React Router v7**   | Client-side routing            |
| **React Icons**       | UI icons set                   |

---

## 📂 Project Structure

    src/
    ├── components/ # Reusable UI components
    ├── contexts/ # Context providers
    ├── layouts/ # Main layout components
    ├── pages/ # Application pages (Home, Auth, etc.)
    ├── App.jsx # Root component with routes
    ├── main.jsx # App entry point
    └── index.css # Global styles

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/Todo-App.git
   cd Todo-App
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open in your browser

   ```bash
   http://localhost:5173/
   ```

---

## 🧩 Notes

Todos are saved in the browser’s local storage — no backend or API used.

The authentication is real using Clerk, but user data is not connected to a database.

Built mainly to demonstrate frontend logic, UI, and React ecosystem integration.

---

## 🏆 Performance

Achieved **perfect Lighthouse scores** on desktop and **near-perfect on mobile** 💪  
This confirms that the app is **highly optimized, accessible, and SEO-friendly.**

| Metric             | Desktop | Mobile |
| ------------------ | ------- | ------ |
| **Performance**    | 100     | 97     |
| **Accessibility**  | 100     | 100    |
| **Best Practices** | 100     | 100    |
| **SEO**            | 100     | 100    |

---

## 👨‍💻 Author

Mustafa Sayed
Front-End Developer | React.js & TailwindCSS

---

## 📜 License

This project is open-source and available under the MIT License.
