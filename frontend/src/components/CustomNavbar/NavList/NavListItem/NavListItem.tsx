import "./NavListItem.css";
import "../../../../utils/utils.css";
export default function NavListItem({
  icon,
  text,
  link,
  onClick,
}: {
  icon: string;
  text: string;
  link?: string;
  onClick?: any;
}) {
  return (
    <li className="  list-item">
      <a
        className="d-flex align-items-center py-3 px-3 text-decoration-none text-white fw-bold"
        href={link}
        onClick={onClick}
      >
        <img className="me-3" src={icon} alt="" style={{ width: "32px" }} />
        {text}
      </a>
    </li>
  );
}
