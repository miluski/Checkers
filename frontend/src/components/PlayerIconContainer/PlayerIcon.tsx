import "./PlayerIcon.css";
export default function ({
  color,
  icon,
}: {
  color: "red" | "blue";
  icon: string;
}) {
  return (
    <div className={"hexagon hexagon-border-" + color}>
      <div className="d-flex hexagon hexagon-inner-content-container justify-content-center align-items-center">
        <img className="img-fluid" src={icon} alt={icon} />
      </div>
    </div>
  );
}
