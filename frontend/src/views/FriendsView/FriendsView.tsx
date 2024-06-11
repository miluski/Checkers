import { useEffect, useState } from "react";
import { User } from "../../utils/types/User";
import { getUsers } from "./getUsers";
import { Button } from "react-bootstrap";
import { getFriends } from "../../utils/getFriends";
import { getInvites } from "./getInvites";
import { sendInvite } from "./sendInvite";
import { removeFriend } from "./removeFriend";
import { acceptInvite } from "./acceptInvite";

export default function FriendsView() {
	const [usersList, setUsersLists] = useState<Array<User> | null>(null);
	const [userFriendsList, setUserFriendsList] = useState<Object | null>(null);
	const [userInvitesList, setUserInvitesList] = useState<Object | null>(null);
	const [refreshFlag, setRefreshFlag] = useState(false);
	const userEmail = localStorage.getItem("loggedUserEmail");
	useEffect(() => {
		(async () => {
			setUsersLists(await getUsers());
			setUserFriendsList(await getFriends());
			setUserInvitesList(await getInvites());
		})();
	}, [refreshFlag]);
	return (
		<>
			{usersList !== null &&
			userFriendsList !== null &&
			userInvitesList !== null ? (
				<div>
					<text>Lista graczy:</text>
					{usersList
						.filter((user: User, _index: number) => {
							return (
								!Object.values(userFriendsList).some(
									(email: string) => email === user.email
								) &&
								user.email !== userEmail &&
								!Object.values(userInvitesList).some(
									(email: string) => email === user.email
								)
							);
						})
						.map((user: User, index: number) => {
							const invitesObj = user.invites;
							let isNotFounded = true;
							if (invitesObj) {
								for (let [_key, value] of Object.entries(invitesObj)) {
									value === userEmail ? (isNotFounded = false) : null;
								}
							}
							return isNotFounded ? (
								<div key={index}>
									<text>{user.email}</text>
									<Button
										onClick={async () => {
											await sendInvite(user.email);
											setRefreshFlag(!refreshFlag);
										}}>
										Dodaj do znajomych
									</Button>
								</div>
							) : (
								<div key={index} />
							);
						})}
					<text>Moi znajomi:</text>
					{Object.values(userFriendsList).map(
						(friendEmail: string, index: number) =>
							friendEmail !== "" ? (
								<div key={index}>
									<text>{friendEmail}</text>
									<Button
										onClick={async () => {
											await removeFriend(friendEmail);
											setRefreshFlag(!refreshFlag);
										}}>
										Usuń ze znajomych
									</Button>
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
									<Button
										onClick={async () => {
											await acceptInvite(friendEmail);
											setRefreshFlag(!refreshFlag);
										}}>
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
