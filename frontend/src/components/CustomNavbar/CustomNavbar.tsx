import { Container, Navbar } from "react-bootstrap";
import Logo from "../Logo/Logo.tsx";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavList from "./NavList/NavList.tsx";

export default function CustomNavbar() {
  return (
    <>
      <Navbar
        key={"xl"}
        expand={"xl"}
        variant={"dark"}
        className="py-3 d-xl-none"
        style={{ backgroundColor: "var(--clr-neutral-700)" }}
      >
        <Container fluid>
          <Logo size="medium" className="ms-4" />
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement="end"
            style={{ backgroundColor: "var(--clr-neutral-700)" }}
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
        className="d-none d-xl-flex flex-column min-vh-100  py-4"
        style={{ backgroundColor: "var(--clr-neutral-700)", width: "14rem" }}
      >
        <div className="mx-auto">
          <Logo size={"small"} />
        </div>
        <NavList />
      </nav>
    </>
  );
}
