import React from "react";
import { Button } from "react-bootstrap";
import "./Screen_after_login_Styles.css";
import {Container, Row, Col } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import handshakeSvg from "../assets/handshake.svg";
import quickplaySvg from "../assets/quick-play.svg";
import computerSvg from "../assets/computer.svg";
import leaderboardSvg from "../assets/leaderboard.svg";
import friendsSvg from "../assets/friends.svg";
import lessonsSvg from "../assets/lessons.svg";
import accountSvg from "../assets/account.svg";
import archiveSvg from "../assets/archive.svg";
import redPng from "../assets/read-king-pawn.png";
import bluePng from "../assets/blue-king-pawn.png";

function Screen_after_login() {
  return (
    <div className="background">
      <div className="header">
        <div className="logo">
            <a className="text-decoration-none" href="#">
            <div className="d-xl-flex align-items-center justify-content-center">
                <div className="me-5 position-relative d-inline-block">
                <img
                    className="z-1"
                    src={redPng}
                    style={{ width: "50px" }}
                    alt="xd"
                />
                <img
                    className="position-absolute right-50 z-1"
                    src={bluePng}
                    style={{ width: "50px", transform: "translateX(-50%)" }}
                    alt="xd"
                />
                </div>
                <h1 className="mb-0 d-inline fw-bolder text-white">Warcaby.pl</h1>
            </div>
            </a>
        </div>
        <Button className="logoutButton btn-danger">Wyloguj</Button>
      </div>

      <Container className="card-container">
      <Row>
        <Col>
            <a className="text-decoration-none" href="#">
            <Card bg="dark" key="dark" text="white" className="card" style={{ width: '270px', height: '265px'}}>
            <Card.Header className="cardHeader">
                <div className="cardBackground card1bcg">
                    <img
                        className="svgs"
                        src={handshakeSvg}
                        style={{ width: "90px" }}
                        alt="xd"
                    />
                </div>
            </Card.Header>
                <Card.Body className="cardBody">
                    <Card.Title>Zagraj ze znajomym</Card.Title>
                    <Card.Text>
                        Zaproś znajomego do wspólnej rozgrywki
                    </Card.Text>
                </Card.Body>
            </Card>
            </a>
        </Col>
        <Col>
            <a className="text-decoration-none" href="#">
            <Card bg="dark" key="dark" text="white" className="card" style={{ width: '270px', height: '265px'}}>
            <Card.Header className="cardHeader">
                <div className="cardBackground card2bcg">
                    <img
                        className="svgs"
                        src={quickplaySvg}
                        style={{ width: "90px" }}
                        alt="xd"
                    />
                </div>
            </Card.Header>
                <Card.Body className="cardBody">
                    <Card.Title>Zagraj ze znajomym</Card.Title>
                    <Card.Text>
                        Wyszukaj gracza o podobnym poziomie umiejętności
                    </Card.Text>
                </Card.Body>
            </Card>
            </a>
        </Col>
        <Col>
            <a className="text-decoration-none" href="#">
            <Card bg="dark" key="dark" text="white" className="card" style={{ width: '270px', height: '265px'}}>
            <Card.Header className="cardHeader">
                <div className="cardBackground card3bcg">
                    <img
                        className="svgs"
                        src={computerSvg}
                        style={{ width: "90px" }}
                        alt="xd"
                    />
                </div>
            </Card.Header>
                <Card.Body className="cardBody">
                    <Card.Title>Zagraj z komputerem</Card.Title>
                    <Card.Text>
                        Przetestuj swoje umiejętności w potyczce ze sztuczną inteligencją
                    </Card.Text>
                </Card.Body>
            </Card>
            </a>
        </Col>
        <Col>
            <a className="text-decoration-none" href="#">
            <Card bg="dark" key="dark" text="white" className="card" style={{ width: '270px', height: '265px'}}>
            <Card.Header className="cardHeader">
                <div className="cardBackground card4bcg">
                    <img
                        className="svgs"
                        src={leaderboardSvg}
                        style={{ width: "90px" }}
                        alt="xd"
                    />
                </div>
            </Card.Header>
                <Card.Body className="cardBody">
                    <Card.Title>Ranking</Card.Title>
                    <Card.Text>
                        Sprawdź swoją pozycję w rankingu
                    </Card.Text>
                </Card.Body>
            </Card>
            </a>
        </Col>
      </Row>

      <Row>
        <Col>
            <a className="text-decoration-none" href="#">
            <Card bg="dark" key="dark" text="white" className="card" style={{ width: '270px', height: '265px'}}>
            <Card.Header className="cardHeader">
                <div className="cardBackground card5bcg">
                    <img
                        className="svgs"
                        src={lessonsSvg}
                        style={{ width: "90px" }}
                        alt="xd"
                    />
                </div>
            </Card.Header>
                <Card.Body className="cardBody">
                    <Card.Title>Jak grać w Warcaby?</Card.Title>
                    <Card.Text>
                        Zobacz zasady gry
                    </Card.Text>
                </Card.Body>
            </Card>
            </a>
        </Col>
        <Col>
            <a className="text-decoration-none" href="#">
            <Card bg="dark" key="dark" text="white" className="card" style={{ width: '270px', height: '265px'}}>
            <Card.Header className="cardHeader">
                <div className="cardBackground card6bcg">
                    <img
                        className="svgs"
                        src={archiveSvg}
                        style={{ width: "90px" }}
                        alt="xd"
                    />
                </div>
            </Card.Header>
                <Card.Body className="cardBody">
                    <Card.Title>Wczytaj grę</Card.Title>
                    <Card.Text>
                        Wczytaj swoją poprzednią grę i przeanalizuj jej przebieg
                    </Card.Text>
                </Card.Body>
            </Card>
            </a>
        </Col>
        <Col>
            <a className="text-decoration-none" href="#">
            <Card bg="dark" key="dark" text="white" className="card" style={{ width: '270px', height: '265px'}}>
            <Card.Header className="cardHeader">
                <div className="cardBackground card7bcg">
                    <img
                        className="svgs"
                        src={accountSvg}
                        style={{ width: "90px" }}
                        alt="xd"
                    />
                </div>
            </Card.Header>
                <Card.Body className="cardBody">
                    <Card.Title>Twoje konto</Card.Title>
                    <Card.Text>
                        Zarządzaj swoim kontem oraz swoimi danymi
                    </Card.Text>
                </Card.Body>
            </Card>
            </a>
        </Col>
        <Col>
            <a className="text-decoration-none" href="#">
            <Card bg="dark" key="dark" text="white" className="card" style={{ width: '270px', height: '265px'}}>
            <Card.Header className="cardHeader">
                <div className="cardBackground card8bcg">
                    <img
                        className="svgs"
                        src={friendsSvg}
                        style={{ width: "90px" }}
                        alt="xd"
                    />
                </div>
            </Card.Header>
                <Card.Body className="cardBody">
                    <Card.Title>Znajomi</Card.Title>
                    <Card.Text>
                        Znajdź i dodawaj znajomych
                    </Card.Text>
                </Card.Body>
            </Card>
            </a>
        </Col>
      </Row>
    </Container>




    </div>
  );
}

export default Screen_after_login;
