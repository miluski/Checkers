import { useEffect, useState } from "react";
import { User } from "../../utils/types/User";
import { getUsers } from "./getUsers";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getFriends } from "../../utils/getFriends";
import { getInvites } from "./getInvites";
import CustomNavbar from "../../components/CustomNavbar/CustomNavbar.tsx";
import accountSvg from "../../assets/icons/account.svg";

export default function FriendsView() {
	const [usersList, setUsersLists] = useState<Array<User> | null>(null);
	const [userFriendsList, setUserFriendsList] = useState<Object | null>(null);
	const [userInvitesList, setUserInvitesList] = useState<Object | null>(null);
	const userEmail = localStorage.getItem("loggedUserEmail");
	useEffect(() => {
		(async () => {
			setUsersLists(await getUsers());
			setUserFriendsList(await getFriends());
			setUserInvitesList(await getInvites());
		})();
	}, []);
	const containerStyle = {
		backgroundColor: 'var(--bs-body-color)', 
		borderColor: 'var(--color-skin-300)', 
		maxWidth: '600px'
	  };
	const addButtonStyle = {
		backgroundColor: 'var(--color-blue-100)',
		borderColor: 'var(--color-blue-100)', 
		color: 'white'
	  };

	return (
		<>
			{usersList !== null &&
			userFriendsList !== null &&
			userInvitesList !== null ? (
				<div style={{backgroundColor: 'var(--clr-neutral-700)'}}>
					<h1>Lista graczy:</h1>
					{usersList
						.filter(
							(user: User, _index: number) =>
								!Object.values(userFriendsList).some(
									(email: string) => email === user.email
								) &&
								user.email !== userEmail &&
								!Object.values(userInvitesList).some(
									(email: string) => email === user.email
								)
						)
						.map((user: User, index: number) => (
							<Container key={index} className="p-3 my-3 border rounded shadow-sm" style={containerStyle}>
							<Row className="d-flex align-items-center">
								<Col xs={3}>
								<img src={accountSvg} alt="account" />
								</Col>
								<Col xs={6}>
								<div className="fw-bold text-white">{user.email}</div>
								</Col>
								<Col xs={2}>
								<Button
									variant="primary"
									style={addButtonStyle}
									onClick={async () => {}}
								>
									Dodaj do znajomych
								</Button>
								</Col>
							</Row>
							</Container>
						))}

					<h1>Moi znajomi:</h1>
					{Object.values(userFriendsList).map(
						(friendEmail: string, index: number) =>
							friendEmail !== "" ? (
								<Container key={index} className="p-3 my-3 border rounded shadow-sm" style={containerStyle}>
								<Row className="d-flex align-items-center">
									<Col xs={3}>
									<img src={accountSvg} alt="account" />
									</Col>
									<Col xs={6}>
									<div className="fw-bold text-white">{friendEmail}</div>
									</Col>
									<Col xs={2}>
									<Button
										variant="primary"
										style={addButtonStyle}
										onClick={async () => {}}
									>
										Usuń ze znajomych
									</Button>
									</Col>
								</Row>
								</Container>
							) : (
								<></>
							)
					)}
					<h1>Zaproszenia do grona znajomych:</h1>
					{Object.values(userInvitesList).map(
						(friendEmail: string, index: number) =>
							friendEmail !== "" ? (
								<Container key={index} className="p-3 my-3 border rounded shadow-sm" style={containerStyle}>
								<Row className="d-flex align-items-center">
									<Col xs={3}>
									<img src={accountSvg} alt="account" />
									</Col>
									<Col xs={6}>
									<div className="fw-bold text-white">{friendEmail}</div>
									</Col>
									<Col xs={2}>
									<Button
										variant="primary"
										style={addButtonStyle}
										onClick={async () => {}}
									>
										Zaakceptuj zaproszenie
									</Button>
									</Col>
								</Row>
								</Container>
							) : (
								<></>
							)
					)}
				</div>
				
			) : (
				<></>
			)}
		</>
	);
}
