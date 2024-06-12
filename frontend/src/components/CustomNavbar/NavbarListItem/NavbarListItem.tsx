import styles from "./NavbarListItem.module.css";
import { MouseEventHandler, useEffect, useState } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export default function NavbarListItem({
  icon,
  text,
  link,
  onClick,
}: {
  icon: string;
  text: string;
  link?: string;
  onClick?: MouseEventHandler;
}) {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    window.innerWidth >= 992 && window.innerWidth < 1200,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992 && window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (isLargeScreen) {
    return (
      <OverlayTrigger
        placement="right"
        delay={{ show: 100, hide: 200 }}
        overlay={<Tooltip className="position-absolute">{text}</Tooltip>}
      >
        <li className={` ${styles.listItem} w-100  `}>
          <a
            className="text-decoration-none d-flex justify-content-lg-center justify-content-xl-start align-items-center py-3 px-3 text-white fw-bold"
            onClick={onClick}
            href={link}
            tabIndex={0}
          >
            <img
              className="me-3 me-lg-0 me-xl-3"
              src={icon}
              alt={icon.split("/").pop()}
            />
          </a>
        </li>
      </OverlayTrigger>
    );
  } else {
    return (
      <li className={` ${styles.listItem} w-100  `}>
        <a
          className=" text-decoration-none d-flex justify-content-lg-center justify-content-xl-start align-items-center py-3 px-3 text-decoration-none text-white fw-bold w-100"
          onClick={onClick}
          href={link}
          tabIndex={0}
        >
          <img
            className="me-3 me-lg-0 me-xl-3"
            src={icon}
            alt={icon.split("/").pop()}
          />
          <span className="d-lg-none d-xl-block">{text}</span>
        </a>
      </li>
    );
  }
}
