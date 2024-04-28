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
      <div className="hexagon p-3 hexagon-inner-content-container">
        <img className="img-fluid" src={icon} alt={icon} />
      </div>
    </div>
  );
}
