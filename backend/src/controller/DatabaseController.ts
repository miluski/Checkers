import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../model/User";
import { userModel } from "../model/UserSchema";

export class DatabaseController {
	private User: any;
	constructor() {
		this.User = userModel;
		dotenv.config();
		mongoose.connect(process.env.DATABASE_URL ?? "");
	}
	public async getIsUserAuthenticated(user: User): Promise<boolean> {
		try {
			const foundUser = await this.User.findOne({
				email: user.email,
				password: user.password,
			});
			return !!foundUser;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
	public async getIsUserExists(user: User): Promise<boolean> {
		try {
			const foundUser = await this.User.findOne({
				email: user.email,
			});
			return !!foundUser;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
	public async saveUser(user: User): Promise<boolean> {
		try {
			const dbUser = new this.User({
				email: user.email,
				password: user.password,
				nickname: user.nickname,
			});
			await dbUser.save();
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}
