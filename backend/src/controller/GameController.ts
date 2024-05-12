import { Express } from "express";

export class GameController {
	private app: Express;
	constructor(app: Express) {
		this.app = app;
		this.handleRequests();
	}
	private handleRequests(): void {}
}
