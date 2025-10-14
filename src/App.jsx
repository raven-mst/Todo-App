import { Navigate, Route, Routes } from "react-router-dom";

// ## Layouts
import MainLayout from "@layouts/MainLayout";
import AuthLayout from "@layouts/AuthLayout";

// ## Pages:
// ### Auth Pages:
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
// ### Other Pages:
import NotFoundPage from "./pages/NotFoundPage";

// ## Components:
import ScreenLoading from "@components/layout/ScreenLoading";
import Navbar from "@components/layout/navbar";

function App() {
  return (
    <div className='App bg-[#0d0714] text-white h-screen flex flex-col'>
      {/* Screen Loading */}
      <ScreenLoading />

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />} />

        {/* Auth Layout */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to={'/auth/login'} replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="forget-password" element={<ForgetPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
        </Route>

        {/* Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App;