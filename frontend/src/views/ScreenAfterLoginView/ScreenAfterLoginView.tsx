import { Container } from "react-bootstrap";
import handshakeSvg from "../../assets/icons/handshake.svg";
import quickPlaySvg from "../../assets/icons/quick-play.svg";
import computerSvg from "../../assets/icons/computer.svg";
import leaderboardSvg from "../../assets/icons/leaderboard.svg";
import friendsSvg from "../../assets/icons/friends.svg";
import lessonsSvg from "../../assets/icons/lessons.svg";
import accountSvg from "../../assets/icons/account.svg";
import archiveSvg from "../../assets/icons/archive.svg";
import CustomCard from "../../components/CustomCard/CustomCard.tsx";
import CustomNavbar from "../../components/CustomNavbar/CustomNavbar.tsx";
import styles from "./ScreenAfterLoginView.module.css";

function ScreenAfterLoginView() {
  return (
    <Container
      fluid
      className={`d-flex flex-column flex-lg-row p-0 ${styles.baseContainer}`}
    >
      <CustomNavbar />
      <Container className="align-self-center">
        <main>
          <nav className=" d-flex flex-wrap justify-content-center align-content-center gap-5 py-5 mt-4 position-relative ">
            <CustomCard
              icon={handshakeSvg}
              title="Zagraj ze znajomym"
              text="Zaproś znajomego do wspólnej gry"
              headerColor="var(--color-skin-100)"
              link="./gameAgainstPlayerView"
            />
            <CustomCard
              icon={quickPlaySvg}
              title="Szybka gra"
              text="Wyszukaj gracza o podobnym poziomie umiejętności"
              headerColor="var(--color-gold-75)"
              link="#"
            />
            <CustomCard
              icon={computerSvg}
              title="Zagraj z komputerem"
              text="Przetestuj swoje umiejętności w potyczcne z AI"
              headerColor="var(--color-slate-400)"
              link="./gameAgainstBotView"
            />
            <CustomCard
              icon={leaderboardSvg}
              title="Ranking"
              text="Sprawdź swoją pozycję w rankingu"
              headerColor="var(--color-brown-500)"
              link="#"
            />
            <CustomCard
              icon={lessonsSvg}
              title="Jak grać w warcaby?"
              text="Zobacz zasady gry"
              headerColor="var(--color-blue-100)"
              link="#"
            />
            <CustomCard
              icon={archiveSvg}
              title="Wczytaj grę"
              text="Wczytaj swoją poprzednią grę i przeanalizuj jej przebieg"
              headerColor="var(--color-brown-700)"
              link="#"
            />
            <CustomCard
              icon={accountSvg}
              title="Twoje konto"
              text="Zarządzaj swoim kontem oraz danymi"
              headerColor="var(--color-slate-500)"
              link="#"
            />
            <CustomCard
              icon={friendsSvg}
              title="Znajomi"
              text="Znajdź i dodawaj znajomych"
              headerColor="var(--color-skin-300)"
              link="./friends"
            />
          </nav>
        </main>
        <p className="text-white-50 text-center fs-8">
          &copy; Karol Przygoda, Maksymilian Sowula, Filip Skibiński Jakub
          Szczur 3ID12A
        </p>
      </Container>
    </Container>
  );
}

export default ScreenAfterLoginView;
