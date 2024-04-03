import { Button } from "react-bootstrap";
import "./App.css";

function App() {
	return (
		<div className='backgroundDiv d-flex flex-column justify-content-center align-items-center position-absolute w-100 h-100'>
			<div className='centeredDiv d-flex flex-column bg-light w-50 h-75 rounded-5 mb-5'>
				<div className='d-flex flex-column justify-content-center align-items-center w-100 m-3'>
					<text className='checkersText fs-1 fw-bold'>Warcaby</text>
				</div>
				<div className='d-flex flex-column justify-content-center align-items-center w-100'>
					<Button className='btn btn-primary fs-4 fw-light w-75 m-4'>Zaloguj/Zarejestruj</Button>
          <Button className='btn btn-primary fs-4 fw-light w-75 m-4'>SinglePlayer</Button>
          <Button className='btn btn-primary fs-4 fw-light w-75 m-4'>Multiplayer</Button>
          <Button className='btn btn-primary fs-4 fw-light w-75 m-4'>Wczytaj grę</Button>
				</div>
			</div>
      <div className='d-flex flex-column justify-content-center align-items-center w-100 mt-5'>
          <text className='copyright fs-4'>@Copyright: Maksymilian Sowula, Jakub Szczur, Filip Skibiński, Karol Przygoda</text>
        </div>
		</div>
	);
}

export default App;
