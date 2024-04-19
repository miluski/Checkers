import { Container } from "react-bootstrap";
import handshakeSvg from "../../assets/handshake.svg";
import quickPlaySvg from "../../assets/quick-play.svg";
import computerSvg from "../../assets/computer.svg";
import leaderboardSvg from "../../assets/leaderboard.svg";
import friendsSvg from "../../assets/friends.svg";
import lessonsSvg from "../../assets/lessons.svg";
import accountSvg from "../../assets/account.svg";
import archiveSvg from "../../assets/archive.svg";
import CustomCard from "../../components/CustomCard/CustomCard.tsx";
import CustomNavbar from "../../components/CustomNavbar/CustomNavbar.tsx";

function ScreenAfterLoginView() {
  return (
    <Container
      fluid
      className="min-vh-100 d-flex flex-column flex-lg-row p-0"
      style={{ backgroundColor: "var(--clr-neutral-750)" }}
    >
      <CustomNavbar />
      <Container className="d-flex flex-wrap justify-content-center align-content-center gap-5 py-5 ">
        <CustomCard
          icon={handshakeSvg}
          title="Zagraj ze znajomym"
          text="Zaproś znajomego do wspólnej gry"
          color="var(--color-skin-100)"
          link="#"
        />
        <CustomCard
          icon={quickPlaySvg}
          title="Szybka gra"
          text="Wyszukaj gracza o podobnym poziomie umiejętności"
          color="var(--color-gold-75)"
          link="#"
        />
        <CustomCard
          icon={computerSvg}
          title="Zagraj z komputerem"
          text="Przetestuj swoje umiejętności w potyczcne z AI"
          color="var(--color-slate-400)"
          link="./gameAgainstBotView"
        />
        <CustomCard
          icon={leaderboardSvg}
          title="Ranking"
          text="Sprawdź swoją pozycję w rankingu"
          color="var(--color-brown-500)"
          link="#"
        />
        <CustomCard
          icon={lessonsSvg}
          title="Jak grać w warcaby?"
          text="Zobacz zasady gry"
          color="var(--color-blue-100)"
          link="#"
        />
        <CustomCard
          icon={archiveSvg}
          title="Wczytaj grę"
          text="Wczytaj swoją poprzednią grę i przeanalizuj jej przebieg"
          color="var(--color-brown-700)"
          link="#"
        />
        <CustomCard
          icon={accountSvg}
          title="Twoje konto"
          text="Zarządzaj swoim kontem oraz danymi"
          color="var(--color-slate-500)"
          link="#"
        />
        <CustomCard
          icon={friendsSvg}
          title="Znajomi"
          text="Znajdź i dodawaj znajomych"
          color="var(--color-skin-300)"
          link="#"
        />
      </Container>
    </Container>
  );
}

export default ScreenAfterLoginView;
