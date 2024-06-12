import mongoose from "mongoose";

export const gameModel = mongoose.model(
	"Game",
	new mongoose.Schema({
		actualTurn: String,
		pawnPositions: Array,
		firstPlayerPoints: Number,
		secondPlayerPoints: Number,
        firstPlayerNickname: String,
        secondPlayerNickname: String,
		firstTimerId: String,
		secondTimerId: String,
		moves: Array,
		isStarted: Boolean,
		private: Boolean,
		loser: String
	})
);
