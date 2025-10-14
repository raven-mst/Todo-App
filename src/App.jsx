import { Navigate, Route, Routes } from "react-router-dom";

// ## Pages:
// ### Main Pages:
import HomePage from "./pages/HomePage";
// ### Auth Pages:
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
// ### Other Pages:
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className='App bg-[#0d0714] text-white min-h-screen'>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        {/* Auth Pages */}
        <Route path="/auth">
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