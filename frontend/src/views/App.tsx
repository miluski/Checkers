import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./Forms/LoginView/LoginView.tsx";
import RegisterView from "./Forms/RegisterView/RegisterView.tsx";
import ForgotPasswordView from "./Forms/ForgotPasswordView/ForgotPasswortView.tsx";
import ScreenAfterLoginView from "./ScreenAfterLoginView/ScreenAfterLoginView.tsx";
import GameAgainstBotView from "./GameAgainstBotView/GameAgainstBotView.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginView />} />
        <Route path="register" element={<RegisterView />} />
        <Route path="login" element={<LoginView />} />
        <Route path="forgotPassword" element={<ForgotPasswordView />} />
        <Route path="screenAfterLogin" element={<ScreenAfterLoginView />} />
        <Route path="gameAgainstBotView" element={<GameAgainstBotView />} />
      </Routes>
    </BrowserRouter>
  );
}
