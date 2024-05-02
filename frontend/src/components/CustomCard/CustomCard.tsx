import Card from "react-bootstrap/Card";
import "./CustomCard.css";

export default function ({
  icon,
  title,
  text,
  headerColor,
  link,
}: {
  icon: string;
  title: string;
  text: string;
  headerColor: string;
  link: string;
}) {
  return (
    <a
      className="text-decoration-none border-0 custom-card-wrapper "
      href={link}
    >
      <Card text="white" className="w-100 border-0 h-100 custom-card">
        <Card.Header
          className="cardHeader text-center border-0 px-4 py-5"
          style={{ backgroundColor: headerColor }}
        >
          <img src={icon} alt={icon.slice(13)} className="custom-card-icon" />
        </Card.Header>
        <Card.Body className="cardBody p-4 d-flex flex-column ">
          <Card.Title>{title}</Card.Title>
          <Card.Text className="custom-card-text">{text}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
}
