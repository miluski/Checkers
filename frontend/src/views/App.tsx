import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./Forms/LoginView/LoginView.tsx";
import RegisterView from "./Forms/RegisterView/RegisterView.tsx";
import ForgotPasswordView from "./Forms/ForgotPasswordView/ForgotPasswortView.tsx";
import ScreenAfterLoginView from "./ScreenAfterLoginView/ScreenAfterLoginView.tsx";
import GameAgainstBotView from "./GameViews/GameAgainstBotView/GameAgainstBotView.tsx";
import GameAgainstPlayerView from "./GameViews/GameAgainstPlayerView/GameAgainstPlayerView.tsx";
import FriendsView from "./FriendsView/FriendsView.tsx";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<LoginView />} />
				<Route path='register' element={<RegisterView />} />
				<Route path='login' element={<LoginView />} />
				<Route path='forgotPassword' element={<ForgotPasswordView />} />
				<Route path='screenAfterLogin' element={<ScreenAfterLoginView />} />
				<Route path='gameAgainstBotView' element={<GameAgainstBotView />} />
				<Route
					path='gameAgainstPlayerView'
					element={<GameAgainstPlayerView />}
				/>
				<Route path='friends' element={<FriendsView />} />
			</Routes>
		</BrowserRouter>
	);
}
