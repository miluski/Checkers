import handshakeSvg from "../../../assets/handshake.svg";
import quickPlaySvg from "../../../assets/quick-play.svg";
import computerSvg from "../../../assets/computer.svg";
import leaderboardSvg from "../../../assets/leaderboard.svg";
import lessonsSvg from "../../../assets/lessons.svg";
import archiveSvg from "../../../assets/archive.svg";
import accountSvg from "../../../assets/account.svg";
import friendsSvg from "../../../assets/friends.svg";
import gearSvg from "../../../assets/gear-fill.svg";
import "./NavList.css";
import CustomButton from "../../CustomButton/CustomButton.tsx";
import NavListItem from "./NavListItem/NavListItem.tsx";
import { useNavigate } from "react-router-dom";

export default function NavList() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column justify-content-between h-100">
      <ul className="list-unstyled d-flex flex-column mt-xl-5 ">
        <NavListItem
          icon={handshakeSvg}
          text={"Graj ze znajomymi"}
          link={"#"}
        />
        <NavListItem icon={quickPlaySvg} text={"Szybka gra"} link={"#"} />
        <NavListItem icon={computerSvg} text={"Zagraj z botem"} link={"#"} />
        <NavListItem
          icon={leaderboardSvg}
          text={"Tablica wyników"}
          link={"#"}
        />
        <NavListItem icon={lessonsSvg} text={"Jak grać ?"} link={"#"} />
        <NavListItem icon={archiveSvg} text={"Wczytaj grę"} link={"#"} />
        <NavListItem icon={accountSvg} text={"Twoje konto"} link={"#"} />
        <NavListItem icon={friendsSvg} text={"Znajomi"} link={"#"} />
        <NavListItem icon={gearSvg} text={"Ustawienia"} link={"#"} />
        <li className="mb-2 px-3 mt-3">
          <CustomButton
            text={"Wyloguj się"}
            type={"button"}
            className="w-100 py-2 "
            onClick={handleLogout}
          />
        </li>
      </ul>
      <a
        className="d-flex align-items-center align-self-center text-decoration-none fw-bold text-secondary help-link"
        href=""
      >
        <i className="bi fs-2 bi-question-circle-fill me-3"></i> Pomoc
      </a>
    </div>
  );
}
