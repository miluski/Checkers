import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getFriends } from "../../../utils/getFriends";
import { getGameInvites } from "../../../utils/GameLogic/getGameInvites";
import { useNavigate } from "react-router";
import { ACCEPT_INVITE, SEND_INVITE } from "../../../components/Board/GameActionTypes";

export default function GameAgainstFriendView() {
	const navigate = useNavigate();
	const [gameInvitesList, setGameInvitesList] = useState<Object | null>(null);
	const [friendsList, setFriendsList] = useState<Object | null>(null);
	useEffect(() => {
		(async () => {
			setGameInvitesList(await getGameInvites());
			setFriendsList(await getFriends());
		})();
	}, []);
	return (
		<>
			{gameInvitesList !== null &&
			!(Object.keys(gameInvitesList!).length === 0) ? (
				Object.values(gameInvitesList).map((gameInvite: any, index: number) => (
					<div key={index}>
						<p>{gameInvite.friendEmail}</p>
						<Button
							onClick={() => {
								const nickname = localStorage.getItem("loggedUserNickname") ?? "";
								localStorage.setItem("enemyNickname", nickname);
								localStorage.setItem(
									"onlineGameCredentials",
									JSON.stringify({
										friendEmail: gameInvite.friendEmail,
										actionType: ACCEPT_INVITE,
                                        gameId: gameInvite.gameId,
									})
								);
								navigate("/gameAgainstPlayerView");
							}}>
							Zaakceptuj zaproszenie
						</Button>
					</div>
				))
			) : (
				<></>
			)}
			{friendsList !== null && Object.keys(gameInvitesList!).length === 0 ? (
				Object.values(friendsList!).map((friendEmail: string, index: number) =>
					friendEmail !== "" ? (
						<div key={index}>
							<p>{friendEmail}</p>
							<Button
								onClick={() => {
									localStorage.setItem(
										"onlineGameCredentials",
										JSON.stringify({
											friendEmail: friendEmail,
											actionType: SEND_INVITE,
										})
									);
									navigate("/gameAgainstPlayerView");
								}}>
								Wyślij zaproszenie
							</Button>
						</div>
					) : (
						<></>
					)
				)
			) : (
				<></>
			)}
		</>
	);
}
