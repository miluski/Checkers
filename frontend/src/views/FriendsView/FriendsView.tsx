import { useEffect, useState } from "react";
import { User } from "../../utils/types/User";
import { getUsers } from "./getUsers";
import { Button } from "react-bootstrap";
import { getFriends } from "../../utils/getFriends";
import { getInvites } from "./getInvites";

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
	return (
		<>
			{usersList !== null &&
			userFriendsList !== null &&
			userInvitesList !== null ? (
				<div>
					<text>Lista graczy:</text>
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
							<div key={index}>
								<text>{user.email}</text>
								<Button onClick={async () => {}}>Dodaj do znajomych</Button>
							</div>
						))}
					<text>Moi znajomi:</text>
					{Object.values(userFriendsList).map(
						(friendEmail: string, index: number) =>
							friendEmail !== "" ? (
								<div key={index}>
									<text>{friendEmail}</text>
									<Button onClick={async () => {}}>Usuń ze znajomych</Button>
								</div>
							) : (
								<></>
							)
					)}
					<text>Zaproszenia do grona znajomych:</text>
					{Object.values(userInvitesList).map(
						(friendEmail: string, index: number) =>
							friendEmail !== "" ? (
								<div key={index}>
									<text>{friendEmail}</text>
									<Button onClick={async () => {}}>
										Zaakceptuj zaproszenie
									</Button>
								</div>
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
