import { Container, Navbar } from "react-bootstrap";
import Logo from "../Logo/Logo.tsx";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./CustomNavbar.css";
import NavbarListItem from "./NavbarListItem/NavbarListItem.tsx";
import handshakeSvg from "../../assets/handshake.svg";
import quickPlaySvg from "../../assets/quick-play.svg";
import computerSvg from "../../assets/computer.svg";
import leaderboardSvg from "../../assets/leaderboard.svg";
import lessonsSvg from "../../assets/lessons.svg";
import archiveSvg from "../../assets/archive.svg";
import accountSvg from "../../assets/account.svg";
import friendsSvg from "../../assets/friends.svg";
import gearSvg from "../../assets/gear-fill.svg";
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
    navigate("/login");
  };

  return (
    <>
      <Navbar
        key={"lg"}
        expand={"lg"}
        variant={"dark"}
        sticky="top"
        className="py-4 custom-navbar"
      >
        <Container fluid className="h-100 px-lg-0 flex-lg-column ">
          <Logo navbarLogo className="ms-4 ms-lg-0 ms-xl-2" />
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg}`} />
          <Navbar.Offcanvas
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
            className="navbar-content-wrapper"
          >
            <Offcanvas.Header closeVariant={"white"} closeButton>
              <Offcanvas.Title className="text-white">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column px-0 h-100 justify-content-between">
              <ul className="list-unstyled d-flex flex-column mt-lg-5 text-nowrap align-items-lg-center align-items-xl-start ">
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
                  placement="right"
                  delay={{ show: 100, hide: 200 }}
                  overlay={
                    <Tooltip className="position-absolute d-none d-lg-block d-xl-none">
                      {"Wyloguj się"}
                    </Tooltip>
                  }
                >
                  <li className="mb-2 mt-3 w-100 button-wrapper">
                    <CustomButton
                      text={
                        <>
                          <i className="bi bi-box-arrow-right fs-5 d-none d-lg-inline d-xl-none"></i>
                          <span className="d-lg-none d-xl-inline">
                            Wyloguj się
                          </span>
                        </>
                      }
                      type={"button"}
                      className="w-100 py-2 px-3"
                      onClick={handleShowLogout}
                    />
                  </li>
                </OverlayTrigger>
              </ul>
              <OverlayTrigger
                placement="right"
                delay={{ show: 100, hide: 200 }}
                overlay={
                  <Tooltip className="position-absolute d-none d-lg-block d-xl-none ">
                    {"Pomoc"}
                  </Tooltip>
                }
              >
                <Button
                  variant="link"
                  className="d-flex align-items-center align-self-center text-decoration-none fw-bold text-secondary help-link "
                  onClick={handleShowHelp}
                >
                  <i className="bi fs-2 bi-question-circle-fill me-3 me-lg-0 me-xl-3"></i>
                  <span className="d-lg-none d-xl-block">Pomoc</span>
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
        icon="bi-question-lg"
        title="Wyloguj się"
        text="Czy napewno chcesz się wylogować"
        color="var(--color-decision)"
        onProceedButtonVariant="primary"
        onDismissButtonVariant="neutral"
        onProceedButtonText="Wyloguj"
        onDismissButtonText="Anuluj"
      />
      <AlertModal
        show={showHelp}
        onProceed={handleSendHelp}
        icon="bi-info-lg"
        title="Masz problem?"
        color="var(--clr-sky-250)"
        onProceedButtonVariant="secondary"
        onProceedButtonText="Wyślij wiadomość"
        backdrop={true}
        onHide={handleCloseHelp}
      />
      <SettingsModal show={show} handleClose={handleClose} />
    </>
  );
}
