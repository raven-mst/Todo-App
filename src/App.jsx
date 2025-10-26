import { Navigate, Route, Routes } from "react-router-dom";

// ## Layouts
import MainLayout from "@layouts/MainLayout";
import AuthLayout from "@layouts/AuthLayout";

// ## Pages:
// ### Main Pages:
import HomePage from "@pages/HomePage";
import ProfilePage from "@pages/ProfilePage";
// ### Auth Pages:
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
// ### Other Pages:
import NotFoundPage from "./pages/NotFoundPage";

// ## Components:
import Navbar from "@components/layout/navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className='App bg-[#0d0714] text-white h-screen flex flex-col'>

      {/* Toast */}
      <ToastContainer />

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Auth Layout */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to={'/auth/login'} replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        {/* Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App;