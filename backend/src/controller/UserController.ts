import { User } from "../model/User";
import { userModel } from "../model/UserSchema";
import { Express, Request, Response } from "express";

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
					isUserFounded ? res.sendStatus(202) : res.sendStatus(401);
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
	private async removeInvite(invitedUser: User, user: User): Promise<boolean> {
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
}
