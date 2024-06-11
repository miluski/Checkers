import { Request, Response, Express } from "express";
import { gameModel } from "../model/GameSchema";
import { TimerController } from "./TimeController";
import { randomInt } from "crypto";

export class GameController {
	private app: Express;
	private timersMap: Map<String, TimerController> = new Map<
		String,
		TimerController
	>();
	constructor(app: Express) {
		this.app = app;
		this.handleRequests();
	}
	private handleRequests(): void {
		this.handleGetAllGamesRequest();
		this.handleGetGameCredentials();
		this.handleCreateGameRequest();
		this.handleJoinToGameRequest();
		this.handleUpdateGameCredentialsRequest();
		this.handleRemoveGameRequest();
		this.handleStartTimer();
		this.handleStopTimer();
		this.handleGetRemainingTime();
		this.handleResetTimers();
	}
	private handleCreateGameRequest(): void {
		const firstPlayerTimer = new TimerController(1);
		const secondPlayerTimer = new TimerController(2);
		const firstTimerId = this.getTimerId();
		const secondTimerId = this.getTimerId();
		this.timersMap.set(firstTimerId, firstPlayerTimer);
		this.timersMap.set(secondTimerId, secondPlayerTimer);
		this.app.post("/api/game/create", async (req: Request, res: Response) => {
			try {
				const isGameExists = await this.getIsGameWithEmailExists(
					req.body.creatorEmail
				);
				if (!isGameExists) {
					const game = new gameModel({
						creatorEmail: req.body.creatorEmail,
						actualTurn: "blue",
						pawnPositions: req.body.pawnPositions,
						firstPlayerPoints: 0,
						secondPlayerPoints: 0,
						firstPlayerNickname: req.body.firstPlayerNickname,
						secondPlayerNickname: "",
						isStarted: false,
						firstTimerId: firstTimerId,
						secondTimerId: secondTimerId,
					});
					await game.save();
					res.status(200).send({
						gameId: game._id,
						firstPlayerTimer: firstPlayerTimer,
						secondPlayerTimer: secondPlayerTimer,
					});
				} else res.sendStatus(300);
			} catch (error) {
				console.log(error);
				res.sendStatus(500);
			}
		});
	}
	private handleGetAllGamesRequest(): void {
		this.app.get("/api/game/getAll", async (_req: Request, res: Response) => {
			try {
				const games = await gameModel.find({});
				res.send(games);
			} catch (error) {
				console.log(error);
				res.sendStatus(500);
			}
		});
	}
	private handleGetGameCredentials(): void {
		this.app.get(
			"/api/game/:id/credentials",
			async (req: Request, res: Response) => {
				try {
					const game = await gameModel.find({ _id: req.params.id });
					res.send(game);
				} catch (error) {
					console.log(error);
					res.sendStatus(500);
				}
			}
		);
	}
	private handleJoinToGameRequest(): void {
		this.app.post("/api/game/:id/join", async (req: Request, res: Response) => {
			try {
				const isGameExists = await this.getIsGameExists(req.params.id);
				if (isGameExists) {
					await gameModel.updateOne(
						{ _id: req.params.id },
						{
							$set: {
								secondPlayerNickname: req.body.secondPlayerNickname,
								isStarted: true,
							},
						}
					);
				} else res.sendStatus(404);
			} catch (error) {
				console.log(error);
				res.sendStatus(500);
			}
		});
	}
	private handleUpdateGameCredentialsRequest(): void {
		this.app.post(
			"/api/game/:id/updateCredentials",
			async (req: Request, res: Response) => {
				try {
					const isGameExists = await this.getIsGameExists(req.params.id);
					if (isGameExists) {
						const isUpdated = await this.updateGameObject(
							req,
							req.body.secondPlayerNickname
						);
						isUpdated ? res.sendStatus(200) : res.sendStatus(500);
					} else res.sendStatus(404);
				} catch (error) {
					console.log(error);
					res.sendStatus(500);
				}
			}
		);
	}
	private handleRemoveGameRequest(): void {
		this.app.delete(
			"/api/game/:id/delete",
			async (req: Request, res: Response) => {
				try {
					const isGameExists = await this.getIsGameExists(req.params.id);
					if (isGameExists) {
						await gameModel.deleteOne({ _id: req.params.id });
						res.sendStatus(200);
					} else res.sendStatus(404);
				} catch (error) {
					console.log(error);
					res.sendStatus(500);
				}
			}
		);
	}
	private handleStartTimer(): void {
		this.app.post("/api/game/startTimer", (req: Request, res: Response) => {
			try {
				const timerId = req.body.timerId;
				this.timersMap.get(timerId)?.startTimer();
				res.sendStatus(200);
			} catch (error) {
				console.log(error);
				res.sendStatus(500);
			}
		});
	}
	private handleStopTimer(): void {
		this.app.post("/api/game/stopTimer", (req: Request, res: Response) => {
			try {
				const timerId = req.body.timerId;
				this.timersMap.get(timerId)?.stopTimer();
				res.sendStatus(200);
			} catch (error) {
				console.log(error);
				res.sendStatus(500);
			}
		});
	}
	private handleResetTimers(): void {
		this.app.post("/api/game/resetTimers", (req: Request, res: Response) => {
			try {
				this.timersMap.get(req.body.firstTimerId)?.resetTimer();
				this.timersMap.get(req.body.secondTimerId)?.resetTimer();
			} catch (error) {
				console.log(error);
				res.sendStatus(500);
			}
		});
	}
	private handleGetRemainingTime(): void {
		this.app.post("/api/game/getTime", (req: Request, res: Response) => {
			try {
				const firstTimerId = req.body.firstTimerId;
				const secondTimerId = req.body.secondTimerId;
				res
					.send({
						firstPlayerTime: this.timersMap.get(firstTimerId)?.getTime(),
						secondPlayerTime: this.timersMap.get(secondTimerId)?.getTime(),
					})
					.status(200);
			} catch (error) {
				console.log(error);
				res.sendStatus(500);
			}
		});
	}
	public async getIsGameExists(gameId: string): Promise<boolean> {
		try {
			const game = await gameModel.findOne({ _id: gameId });
			return game !== null;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
	public async getIsGameWithEmailExists(email: string): Promise<boolean> {
		try {
			const game = await gameModel.findOne({ creatorEmail: email });
			return game !== null;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
	public async updateGameObject(
		req: Request,
		secondPlayerNickname: string
	): Promise<boolean> {
		try {
			const gameId = req.params.id ?? req.body.gameId;
			await gameModel.updateOne(
				{ _id: gameId },
				{
					$set: {
						actualTurn: req.body.actualTurn,
						pawnPositions: req.body.pawnPositions,
						firstPlayerPoints: req.body.firstPlayerPoints,
						secondPlayerPoints: req.body.secondPlayerPoints,
						secondPlayerNickname: secondPlayerNickname,
						isStarted: req.body.isStarted,
						moves: req.body.moves,
					},
				}
			);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
	private getTimerId(): string {
		const chars = "1234567890";
		let id = "";
		for (let i = 0; i < 6; i++) {
			const position = randomInt(9);
			id += chars.substring(position, position + 1);
		}
		return id;
	}
}
