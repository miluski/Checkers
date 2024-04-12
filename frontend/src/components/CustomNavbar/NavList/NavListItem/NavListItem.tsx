import "./NavListItem.css";
export default function NavListItem({
  icon,
  text,
  link,
}: {
  icon: string;
  text: string;
  link: string;
}) {
  return (
    <li className="  list-item">
      <a
        className="d-flex align-items-center py-3 px-3 text-decoration-none text-white fw-bold"
        href={link}
      >
        <img className="me-3" src={icon} alt="" style={{ width: "32px" }} />
        {text}
      </a>
    </li>
  );
}
