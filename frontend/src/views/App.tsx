import { Route, Routes } from "react-router";
import RegisterView from "./RegisterView/RegisterView";
import ScreenAfterLogin from "./ScreenAfterLogin";
import { legacy_createStore } from "redux";
import { appReducer } from "../utils/appReducer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css"

function App() {
	const store = legacy_createStore(appReducer);
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<RegisterView />} />
					<Route path='/guide' element={<ScreenAfterLogin />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
