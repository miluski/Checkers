import { useEffect, useState } from "react";
import { User } from "../../utils/User";
import { getUsers } from "./getUsers";
import { Button } from "react-bootstrap";
import { getFriends } from "./getFriends";

export default function FriendsView() {
	const [usersList, setUsersLists] = useState<Array<User> | null>(null);
	const [userFriendsList, setUserFriendsList] = useState<Object | null>(null);
	const userEmail = localStorage.getItem("loggedUserEmail");
	useEffect(() => {
		(async () => {
			setUsersLists(await getUsers());
			setUserFriendsList(await getFriends());
		})();
	}, []);
	return (
		<>
			{usersList !== null && userFriendsList !== null ? (
				<div>
					<text>Lista graczy:</text>
					{usersList
						.filter(
							(user: User, _index: number) =>
								!Object.values(userFriendsList).some(
									(email: string) => email === user.email
								) && user.email !== userEmail
						)
						.map((user: User, index: number) => (
							<div key={index}>
								<text>{user.email}</text>
								<Button onClick={async () => {}}>Dodaj do znajomych</Button>
							</div>
						))}
					<text>Moi znajomi:</text>
					{Object.values(userFriendsList).map(
						(friendEmail: string, index: number) => (
							<div key={index}>
								<text>{friendEmail}</text>
								<Button onClick={async () => {}}>Usuń ze znajomych</Button>
							</div>
						)
					)}
				</div>
			) : (
				<></>
			)}
		</>
	);
}
