import { Container, Navbar } from "react-bootstrap";
import Logo from "../Logo/Logo.tsx";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavList from "./NavList/NavList.tsx";
import redKing from "../../assets/red-king-pawn.png";
import bluePawn from "../../assets/blue-pawn.png";

export default function CustomNavbar() {
  return (
    <>
      <Navbar
        key={"lg"}
        expand={"lg"}
        variant={"dark"}
        className="py-3 d-lg-none"
        style={{ backgroundColor: "var(--clr-neutral-700)" }}
      >
        <Container fluid>
          <Logo size="medium" className="ms-4 " />
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement="end"
            style={{
              backgroundColor: "var(--clr-neutral-700)",
              maxWidth: "101%",
            }}
          >
            <Offcanvas.Header closeVariant={"white"} closeButton>
              <Offcanvas.Title
                className="text-white"
                id={`offcanvasNavbarLabel-expand-xl`}
              >
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <NavList />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <nav
        className="d-none d-lg-flex flex-column min-vh-100  py-4"
        style={{ backgroundColor: "var(--clr-neutral-700)" }}
      >
        <div className="mx-auto">
          <Logo size={"small"} className="d-lg-none d-xl-flex" />
          <a
            className="text-decoration-none  d-lg-block d-xl-none mb-4 "
            href="#"
          >
            <div
              className={"d-flex align-items-center justify-content-center "}
            >
              <div className={"position-relative d-flex ms-4 "}>
                <img
                  className="position-absolute end-50"
                  src={redKing}
                  alt="red-king-pawn"
                  style={{ width: "40px" }}
                />
                <img src={bluePawn} alt="blue-pawn" style={{ width: "40px" }} />
              </div>
            </div>
          </a>
        </div>
        <NavList />
      </nav>
    </>
  );
}
