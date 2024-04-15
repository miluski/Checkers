import Card from "react-bootstrap/Card";
import "./CustomCard.css";

export default function ({
  icon,
  title,
  text,
  color,
  link,
}: {
  icon: string;
  title: string;
  text: string;
  color: string;
  link: string;
}) {
  return (
    <a className="text-decoration-none border-0 card-custom " href={link}>
      <Card text="white" className="w-100 border-0 h-100 card-inner">
        <Card.Header
          className="cardHeader text-center border-0 px-4 py-5"
          style={{ backgroundColor: color }}
        >
          <img src={icon} alt={icon} style={{ width: "8rem" }} />
        </Card.Header>
        <Card.Body className="cardBody p-4 d-flex flex-column ">
          <Card.Title>{title}</Card.Title>
          <Card.Text style={{ color: "var(--color-transparent-white-72)" }}>
            {text}
          </Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
}
