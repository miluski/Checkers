import redKing from "../../assets/red-king-pawn.png";
import bluePawn from "../../assets/blue-pawn.png";

export default function Logo() {
  return (
    <a className="text-decoration-none" href="#">
      <div className="d-xl-flex align-items-center justify-content-center ">
        <div className="me-5 position-relative d-inline-block">
          <img
            className="z-1"
            src={redKing}
            style={{ width: "60px" }}
            alt="red-king-pawn"
          />
          <img
            className="position-absolute start-50 z-n1"
            src={bluePawn}
            style={{ width: "60px" }}
            alt="blue-pawn"
          />
        </div>
        <h1 className="mb-0 d-inline fw-bolder text-white">Warcaby.pl</h1>
      </div>
    </a>
  );
}
