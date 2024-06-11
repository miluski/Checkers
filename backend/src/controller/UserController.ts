import { gameModel } from "../model/GameSchema";
import { User } from "../model/User";
import { userModel } from "../model/UserSchema";
import { Express, Request, Response } from "express";
import { GameController } from "./GameController";

export class UserController {
	private app: Express;
	constructor(app: Express) {
		this.app = app;
		this.handleRequests();
	}
	private handleRequests(): void {
		this.handleLoginRequest();
		this.handleRegisterRequest();
		this.handleGetAccountsList();
		this.handleGetFriendsListRequest();
		this.handleAcceptFriendRequest();
		this.handleSendInviteRequest();
		this.handleRemoveFriendRequest();
		this.handleGetInvitesListRequest();
		this.handleSendInviteToGameRequest();
		this.handleAcceptInviteToGameRequest();
		this.handleGetGameInvitesListRequest();
	}
	private handleLoginRequest(): void {
		this.app.post(
			"/api/user/auth/login",
			async (req: Request, res: Response) => {
				try {
					const isUserFounded = await userModel.findOne({
						email: req.body.email,
						password: req.body.password,
					});
					isUserFounded
						? res.status(202).send({
								nickname: isUserFounded.nickname,
								email: isUserFounded.email,
						  })
						: res.sendStatus(401);
				} catch (error) {
					console.log(error);
					res.sendStatus(500);
				}
			}
		);
	}
	private handleRegisterRequest(): void {
		this.app.post(
			"/api/user/auth/register",
			async (req: Request, res: Response) => {
				try {
					const isUserExists = await this.getUser(req.body.email);
					if (isUserExists) {
						res.sendStatus(401);
					} else {
						const dbUser = new userModel({
							email: req.body.email,
							password: req.body.password,
							nickname: req.body.nickname,
						});
						await dbUser.save();
						res.sendStatus(200);
					}
				} catch (error) {
					console.log(error);
					res.sendStatus(500);
				}
			}
		);
	}
	private handleGetAccountsList(): void {
		this.app.get("/api/user/getAll", async (_req: Request, res: Response) => {
			res
				.status(200)
				.send(await userModel.find({}, "email nickname friends invites"));
		});
	}
	private handleGetFriendsListRequest(): void {
		this.app.get(
			"/api/user/friends/email/:email",
			async (req: Request, res: Response) => {
				const user = await this.getUser(req.params.email);
				user ? res.status(200).send(user.friends) : res.sendStatus(404);
			}
		);
	}
	private handleGetInvitesListRequest(): void {
		this.app.get(
			"/api/user/:email/getInvites",
			async (req: Request, res: Response) => {
				const user = await this.getUser(req.params.email);
				user ? res.status(200).send(user.invites) : res.sendStatus(404);
			}
		);
	}
	private handleGetGameInvitesListRequest(): void {
		this.app.get(
			"/api/user/:email/getGameInvites",
			async (req: Request, res: Response) => {
				const user = await this.getUser(req.params.email);
				user ? res.status(200).send(user.gameInvites) : res.sendStatus(404);
			}
		);
	}
	private handleAcceptFriendRequest(): void {
		this.app.post(
			"/api/user/acceptInvite",
			async (req: Request, res: Response) => {
				let statusCode = 200;
				const userEmail = req.body.userEmail;
				const invitedUserEmail = req.body.invitedUserEmail;
				if (userEmail !== invitedUserEmail) {
					const invitedUser = await this.getUser(invitedUserEmail);
					const user = await this.getUser(userEmail);
					const isInviteSended = await this.getHasInvitedUserIsInvitedAlready(
						user,
						invitedUser
					);
					if (user && invitedUser && isInviteSended) {
						const isFriendsAdded =
							(await this.updateUserFriends(invitedUser, user)) &&
							(await this.updateUserFriends(user, invitedUser)) &&
							(await this.removeInvite(invitedUser, user));
						statusCode = isFriendsAdded ? 200 : 500;
					} else statusCode = 500;
				}
				res.sendStatus(statusCode);
			}
		);
	}
	private handleSendInviteRequest(): void {
		this.app.post(
			"/api/user/sendInvite",
			async (req: Request, res: Response) => {
				let statusCode = 200;
				const userEmail = req.body.userEmail;
				const invitedUserEmail = req.body.invitedUserEmail;
				if (userEmail !== invitedUserEmail) {
					const invitedUser = await this.getUser(invitedUserEmail);
					const user = await this.getUser(userEmail);
					const isFriendsAlready = await this.getHasInvitedUserIsFriendAlready(
						user,
						invitedUser
					);
					const isInvitedAlready = await this.getHasInvitedUserIsInvitedAlready(
						user,
						invitedUser
					);
					const isInvitedCorrectly =
						isFriendsAlready || isInvitedAlready
							? false
							: await this.saveInvite(invitedUser, user);
					statusCode = isInvitedCorrectly ? 200 : 500;
				}
				res.sendStatus(statusCode);
			}
		);
	}
	private handleRemoveFriendRequest(): void {
		this.app.delete(
			"/api/user/removeFriend",
			async (req: Request, res: Response) => {
				const user = await this.getUser(req.body.userEmail);
				const removedFriend = await this.getUser(req.body.friendEmail);
				const isFriendsAlready = await this.getHasInvitedUserIsFriendAlready(
					user,
					removedFriend
				);
				if (user && removedFriend && isFriendsAlready) {
					const isFriendRemoved = await this.removeFriend(removedFriend, user);
					isFriendRemoved ? res.sendStatus(200) : res.sendStatus(500);
				} else res.sendStatus(500);
			}
		);
	}
	private handleSendInviteToGameRequest(): void {
		this.app.post(
			"/api/user/gameInvite",
			async (req: Request, res: Response) => {
				try {
					const isInviteExists = await this.getIsGameInviteExists(
						req.body.friendEmail
					);
					const user = await this.getUser(req.body.friendEmail);
					if (!isInviteExists && user !== null) {
						await userModel.updateOne(
							{ _id: user._id },
							{
								$push: {
									gameInvites: {
										gameId: req.body.gameId,
										friendEmail: req.body.email,
									},
								},
							}
						);
						res.sendStatus(200);
					} else res.sendStatus(300);
				} catch (error) {
					console.log(error);
					res.sendStatus(500);
				}
			}
		);
	}
	private handleAcceptInviteToGameRequest(): void {
		this.app.post(
			"/api/user/acceptGameInvite",
			async (req: Request, res: Response) => {
				try {
					const gameController = new GameController(this.app);
					const isInviteExists = await this.getIsGameInviteExists(
						req.body.friendEmail
					);
					const isGameExists = await gameController.getIsGameExists(
						req.body.gameId
					);
					const user = await this.getUser(req.body.email);
					if (isInviteExists && isGameExists && user !== null) {
						const isInviteRemoved = await this.removeGameInvite(
							user._id,
							req.body.friendEmail
						);
						const isGameObjectUpdated = await gameController.updateGameObject(
							req,
							user.nickname ?? ""
						);
						isInviteRemoved && isGameObjectUpdated
							? res.sendStatus(200)
							: res.sendStatus(500);
					} else res.sendStatus(500);
				} catch (error) {
					console.log(error);
					res.sendStatus(500);
				}
			}
		);
	}
	private async getUser(userEmail: string): Promise<User | null> {
		try {
			return await userModel.findOne({ email: userEmail });
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	private async updateUserFriends(
		userObject: User,
		friendObject: User
	): Promise<boolean> {
		try {
			await userModel.updateOne(
				{ _id: userObject._id },
				{ $set: { [`friends.${friendObject._id}`]: friendObject.email } }
			);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
	private async removeInvite(user: User, invitedUser: User): Promise<boolean> {
		try {
			await userModel.updateOne(
				{ _id: invitedUser._id },
				{ $unset: { [`invites.${user._id}`]: "" } }
			);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
	private async removeFriend(removedUser: User, user: User): Promise<boolean> {
		try {
			await userModel.updateOne(
				{ _id: user._id },
				{ $unset: { [`friends.${removedUser._id}`]: "" } }
			);
			await userModel.updateOne(
				{ _id: removedUser._id },
				{ $unset: { [`friends.${user._id}`]: "" } }
			);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
	private async getHasInvitedUserIsFriendAlready(
		user: User | null,
		invitedUser: User | null
	): Promise<boolean> {
		try {
			if (user && invitedUser) {
				const foundedUser = await userModel.findOne({
					_id: invitedUser._id,
					[`friends.${user._id}`]: { $exists: true },
				});
				return foundedUser !== null;
			} else return true;
		} catch (error) {
			console.log(error);
			return true;
		}
	}
	private async getHasInvitedUserIsInvitedAlready(
		user: User | null,
		invitedUser: User | null
	): Promise<boolean> {
		try {
			if (user && invitedUser) {
				const foundedUser =
					(await userModel.findOne({
						_id: invitedUser._id,
						[`invites.${user._id}`]: { $exists: true },
					})) ||
					(await userModel.findOne({
						_id: user._id,
						[`invites.${invitedUser._id}`]: { $exists: true },
					}));
				return foundedUser !== null;
			} else return true;
		} catch (error) {
			console.log(error);
			return true;
		}
	}
	private async saveInvite(
		invitedUser: User | null,
		user: User | null
	): Promise<boolean> {
		try {
			if (user && invitedUser) {
				await userModel.updateOne(
					{ _id: invitedUser._id },
					{ $set: { [`invites.${user._id}`]: user.email } }
				);
				return true;
			} else return false;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
	private async getIsGameInviteExists(friendEmail: string): Promise<boolean> {
		try {
			const game = await userModel.findOne({
				gameInvites: {
					$elemMatch: { friendEmail: friendEmail },
				},
			});
			return game !== null;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
	private async removeGameInvite(
		userId: string,
		email: string
	): Promise<boolean> {
		try {
			await userModel.updateOne(
				{ _id: userId },
				{ $pull: { gameInvites: { friendEmail: email } } }
			);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}
