import redKing from "../../assets/red-king-pawn.png";
import bluePawn from "../../assets/blue-pawn.png";
import "./Logo.css";

export default function Logo({
  navbarLogo,
  className,
}: {
  navbarLogo?: boolean;
  className?: string;
}) {
  return (
    <a className="text-decoration-none " href="#">
      <div
        className={
          "d-flex align-items-center justify-content-center " + className
        }
      >
        <div
          className={
            "position-relative d-flex  logo " +
            (navbarLogo
              ? "me-3 me-lg-0 me-xl-3 ms-lg-3 ms-xl-0 navbar-logo"
              : "me-4")
          }
        >
          <img
            className="position-absolute end-50"
            src={redKing}
            alt="red-king-pawn"
          />
          <img src={bluePawn} alt="blue-pawn" />
        </div>
        <h1
          className={
            "mb-0 d-inline fw-bolder text-white " +
            (navbarLogo ? "d-lg-none d-xl-block fs-4" : "fs-1")
          }
        >
          Warcaby.pl
        </h1>
      </div>
    </a>
  );
}
