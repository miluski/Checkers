import { Container, Navbar } from "react-bootstrap";
import Logo from "../Logo/Logo.tsx";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./CustomNavbar.module.css";
import NavbarListItem from "./NavbarListItem/NavbarListItem.tsx";
import handshakeSvg from "../../assets/icons/handshake.svg";
import quickPlaySvg from "../../assets/icons/quick-play.svg";
import computerSvg from "../../assets/icons/computer.svg";
import leaderboardSvg from "../../assets/icons/leaderboard.svg";
import lessonsSvg from "../../assets/icons/lessons.svg";
import archiveSvg from "../../assets/icons/archive.svg";
import accountSvg from "../../assets/icons/account.svg";
import friendsSvg from "../../assets/icons/friends.svg";
import gearSvg from "../../assets/icons/gear-fill.svg";
import CustomButton from "../Buttons/CustomButton/CustomButton.tsx";
import { useNavigate } from "react-router-dom";
import AlertModal from "../Modals/AlertModal/AlertModal.tsx";
import { useState } from "react";
import { Button } from "react-bootstrap";
import SettingsModal from "../Modals/SettingsModal/SettingsModal.tsx";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export default function CustomNavbar() {
	const navigate = useNavigate();

	const [showLogout, setShowLogout] = useState(false);
	const handleCloseLogout = () => setShowLogout(false);
	const handleShowLogout = () => setShowLogout(true);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showHelp, setShowHelp] = useState(false);
	const handleSendHelp = () => {
		setShowHelp(false);
		window.open("mailto:karolprzygodastudia@gmail.com", "_blank");
	};
	const handleCloseHelp = () => {
		setShowHelp(false);
	};
	const handleShowHelp = () => setShowHelp(true);

	const handleLogout = () => {
		localStorage.removeItem("loggedUserEmail");
		navigate("/login");
	};

	return (
		<>
			<Navbar
				key={"lg"}
				expand={"lg"}
				variant={"dark"}
				className={`py-4 ${styles.customNavbar} `}>
				<Container fluid className='h-100 px-lg-0 flex-lg-column '>
					<Logo navbarLogo className='ms-4 ms-lg-0 ms-xl-2' />
					<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg}`} />
					<Navbar.Offcanvas
						aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
						placement='end'
						className={styles.offcanvasContnetWrapper}>
						<Offcanvas.Header closeVariant={"white"} closeButton>
							<Offcanvas.Title className='text-white'>Menu</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body className='d-flex flex-column px-0 h-100 justify-content-between'>
							<ul className='list-unstyled d-flex flex-column mt-lg-5 text-nowrap align-items-lg-center align-items-xl-start '>
								<NavbarListItem
									icon={handshakeSvg}
									text={"Graj ze znajomymi"}
									link={"./gameAgainstPlayerView"}
								/>
								<NavbarListItem icon={quickPlaySvg} text={"Szybka gra"} />
								<NavbarListItem
									icon={computerSvg}
									text={"Zagraj z botem"}
									link={"./gameAgainstBotView"}
								/>
								<NavbarListItem
									icon={leaderboardSvg}
									text={"Tablica wyników"}
								/>
								<NavbarListItem icon={lessonsSvg} text={"Jak grać ?"} />
								<NavbarListItem icon={archiveSvg} text={"Wczytaj grę"} />
								<NavbarListItem icon={accountSvg} text={"Twoje konto"} />
								<NavbarListItem icon={friendsSvg} text={"Znajomi"} link={"#"} />
								<NavbarListItem
									icon={gearSvg}
									text={"Ustawienia"}
									onClick={handleShow}
								/>
								<OverlayTrigger
									placement='right'
									delay={{ show: 100, hide: 200 }}
									overlay={
										<Tooltip className='position-absolute d-none d-lg-block d-xl-none'>
											{"Wyloguj się"}
										</Tooltip>
									}>
									<li className={`mb-2 mt-3 w-100 ${styles.buttonWrapper}`}>
										<CustomButton
											text={
												<>
													<i className='bi bi-box-arrow-right fs-5 d-none d-lg-inline d-xl-none'></i>
													<span className='d-lg-none d-xl-inline'>
														Wyloguj się
													</span>
												</>
											}
											type={"button"}
											className='w-100 py-2 px-3'
											onClick={handleShowLogout}
										/>
									</li>
								</OverlayTrigger>
							</ul>
							<OverlayTrigger
								placement='right'
								delay={{ show: 100, hide: 200 }}
								overlay={
									<Tooltip className='position-absolute d-none d-lg-block d-xl-none '>
										{"Pomoc"}
									</Tooltip>
								}>
								<Button
									variant='link'
									className={`d-flex align-items-center align-self-center text-decoration-none fw-bold text-secondary ${styles.helpLink} `}
									onClick={handleShowHelp}>
									<i className='bi fs-2 bi-question-circle-fill me-3 me-lg-0 me-xl-3'></i>
									<span className='d-lg-none d-xl-block'>Pomoc</span>
								</Button>
							</OverlayTrigger>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
			<AlertModal
				show={showLogout}
				onProceed={handleLogout}
				onDismiss={handleCloseLogout}
				icon={
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='100%'
						height='100%'
						fill='currentColor'
						className='bi bi-question-lg'
						viewBox='0 0 16 16'>
						<path d='M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14' />
					</svg>
				}
				title='Wyloguj się'
				text='Czy napewno chcesz się wylogować'
				color='var(--color-orange-300)'
				onProceedButtonVariant='primary'
				onDismissButtonVariant='neutral'
				onProceedButtonText='Wyloguj'
				onDismissButtonText='Anuluj'
			/>
			<AlertModal
				show={showHelp}
				onProceed={handleSendHelp}
				icon={
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='100%'
						height='100%'
						fill='currentColor'
						className='bi bi-info-lg'
						viewBox='0 0 16 16'>
						<path d='m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0' />
					</svg>
				}
				title='Masz problem?'
				color='var(--clr-sky-250)'
				onProceedButtonVariant='secondary'
				onProceedButtonText='Wyślij wiadomość'
				backdrop={true}
				onHide={handleCloseHelp}
			/>
			<SettingsModal show={show} handleClose={handleClose} />
		</>
	);
}
