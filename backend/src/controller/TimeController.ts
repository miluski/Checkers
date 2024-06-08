export class TimerController {
	private interval: NodeJS.Timeout | null;
	private time: string;
	constructor() {
		this.interval = null;
		this.time = "3:00";
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
				? this.resetTimer()
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
		this.interval = null;
	}
	public getTime(): string {
		return this.time;
	}
}
