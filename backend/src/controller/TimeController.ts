import { randomInt } from "crypto";

export class TimerController {
	private time: string;
	private playerNumber: number;
	private interval: NodeJS.Timeout | null;
	constructor(playerNumber: number) {
		this.interval = null;
		this.time = "3:00";
		this.playerNumber = playerNumber;
	}
	public startTimer() {
		this.interval = setInterval(() => {
			const [minutes, seconds] = this.time.split(":").map(Number);
			let newMinutes = minutes;
			let newSeconds = seconds - 1;
			if (newSeconds < 0) {
				newMinutes--;
				newSeconds = 59;
			}
			newMinutes < 0
				? null
				: (this.time = `${newMinutes}:${
						newSeconds < 10 ? "0" : ""
				  }${newSeconds}`);
		}, 1000);
	}
	public stopTimer() {
		this.interval && clearInterval(this.interval);
	}
	public resetTimer() {
		this.time = "3:00";
		this.interval && clearInterval(this.interval);
	}
	public getTime(): string {
		return this.time;
	}
	public getPlayerNumber(): number {
		return this.playerNumber;
	}
}
