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
    <li className=" list-item w-100 ">
      <a
        className="d-flex justify-content-lg-center justify-content-xl-start align-items-center py-3 px-3 text-decoration-none text-white fw-bold"
        href={link}
        onClick={onClick}
      >
        <img
          className="me-3 me-lg-0 me-xl-3"
          src={icon}
          alt=""
          style={{ width: "32px" }}
        />
        <span className="d-lg-none d-xl-block">{text}</span>
      </a>
    </li>
  );
}
