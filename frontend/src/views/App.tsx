import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./Forms/LoginView/LoginView.tsx";
import RegisterView from "./Forms/RegisterView/RegisterView.tsx";
import ForgotPasswordView from "./Forms/ForgotPasswordView/ForgotPasswortView.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginView />} />
        <Route path="register" element={<RegisterView />} />
        <Route path="login" element={<LoginView />} />
        <Route path="forgotPassword" element={<ForgotPasswordView />} />
      </Routes>
    </BrowserRouter>
  );
}
