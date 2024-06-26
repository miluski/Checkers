import "./App.css";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import LoginView from "./Forms/LoginView/LoginView";
import RegisterView from "./Forms/RegisterView/RegisterView";
import ForgotPasswordView from "./Forms/ForgotPasswordView/ForgotPasswortView";
import ScreenAfterLoginView from "./ScreenAfterLoginView/ScreenAfterLoginView";
import GameAgainstBotView from "./GameViews/GameAgainstBotView/GameAgainstBotView";
import GameAgainstPlayerView from "./GameViews/GameAgainstPlayerView/GameAgainstPlayerView";
import FriendsView from "./FriendsView/FriendsView";
import GameAgainstFriendView from "./GameViews/GameAgainstFriendView/GameAgainstFriendView";
import { combineReducers, legacy_createStore } from "redux";
import { Provider } from "react-redux";
import { boardReducer } from "../utils/reducers/boardReducer";
import gameReducer from "../utils/reducers/gameReducer";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route index element={<LoginView />} />
			<Route path='register' element={<RegisterView />} />
			<Route path='login' element={<LoginView />} />
			<Route path='forgotPassword' element={<ForgotPasswordView />} />
			<Route path='screenAfterLogin' element={<ScreenAfterLoginView />} />
			<Route path='gameAgainstBotView' element={<GameAgainstBotView />} />
			<Route path='gameAgainstPlayerView' element={<GameAgainstPlayerView />} />
			<Route path='gameAgainstFriendView' element={<GameAgainstFriendView />} />
			<Route path='friends' element={<FriendsView />} />
		</>
	)
);

export default function App() {
	const rootReducer = combineReducers({
		gameReducer,
		boardReducer
	})
	const store = legacy_createStore(rootReducer);
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}
