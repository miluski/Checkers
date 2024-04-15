import dotenv from "dotenv";
import cors from 'cors';
import express, { Express } from "express";
import { DatabaseController } from "./DatabaseController";

export class ServerController {
	private app: Express = express();
	private port = process.env.PORT ?? 3000;
	constructor() {
		dotenv.config();
		this.app.use(express.json());
        this.app.use(cors());
		this.app.listen(this.port, () => {
			console.log(`Server is running at http://localhost:${this.port}`);
		});
		this.setEndpointsHandling();
	}
	private setEndpointsHandling() {
		this.handleLoginRequest();
		this.handleRegisterRequest();
	}
	private handleLoginRequest(): void {
		this.app.post("/api/user/auth/login", async (req, res) => {
			const database = new DatabaseController();
			const isFounded = await database.getIsUserAuthenticated({
				email: req.body.email,
				password: req.body.password,
			});
			isFounded ? res.sendStatus(200) : res.sendStatus(401);
		});
	}
	private handleRegisterRequest(): void {
		this.app.post("/api/user/auth/register", async (req, res) => {
			const database = new DatabaseController();
			const isFounded = await database.getIsUserExists({
				email: req.body.email
			});
			if (isFounded) {
				res.sendStatus(403);
			} else {
				const isSaved = await database.saveUser({
					nickname: req.body.nickname,
					password: req.body.password,
					email: req.body.email,
				});
				isSaved ? res.sendStatus(200) : res.sendStatus(500);
			}
		});
	}
}
