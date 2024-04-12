import redKing from "../../assets/red-king-pawn.png";
import bluePawn from "../../assets/blue-pawn.png";

export default function Logo({
  size,
  className,
}: {
  size: "small" | "medium" | "big";
  className?: string;
}) {
  let width;
  let fontSize;
  let gap;

  switch (size) {
    case "small":
      width = "30px";
      fontSize = "fs-4";
      gap = "me-2";
      break;
    case "medium":
      width = "40px";
      fontSize = "fs-3";
      gap = "me-3";
      break;
    case "big":
      width = "60px";
      fontSize = "fs-1";
      gap = "me-4";
      break;
  }

  return (
    <a className="text-decoration-none " href="#">
      <div
        className={
          "d-flex align-items-center justify-content-center " + className
        }
      >
        <div className={"position-relative d-flex  " + gap}>
          <img
            className="position-absolute end-50"
            src={redKing}
            style={{ width: width }}
            alt="red-king-pawn"
          />
          <img src={bluePawn} style={{ width: width }} alt="blue-pawn" />
        </div>
        <h1 className={"mb-0 d-inline fw-bolder text-white " + fontSize}>
          Warcaby.pl
        </h1>
      </div>
    </a>
  );
}
