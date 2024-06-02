import { GameAction } from "../types/Action";
import {
	CHANGE_NICKNAME,
	CHANGE_ENEMY_NICKNAME,
	CHANGE_PLAYER_COLOR,
	CHANGE_FIRST_PLAYER_POINTS,
	CHANGE_SECOND_PLAYER_POINTS,
	CHANGE_FIRST_PLAYER_TIME,
	CHANGE_SECOND_PLAYER_TIME,
	CHANGE_TURN_NUMBER,
	CHANGE_MOVES,
	CHANGE_CAN_LEAVE,
} from "../ActionTypes";

const initialState = {
	stateNickname: "",
	stateEnemyNickname: "",
	statePlayerColor: "",
	firstPlayerPoints: 0,
	secondPlayerPoints: 0,
	firstPlayerTime: "3:00",
	secondPlayerTime: "3:00",
	moves: [{}],
	turnNumber: 0,
	canLeave: false,
};

export default function gameReducer(state = initialState, action: GameAction) {
	switch (action.type) {
		case CHANGE_NICKNAME:
			return {
				...state,
				stateNickname: action.newNickname,
			};
		case CHANGE_ENEMY_NICKNAME:
			return {
				...state,
				stateEnemyNickname: action.newEnemyNickname,
			};
		case CHANGE_PLAYER_COLOR:
			return {
				...state,
				statePlayerColor: action.newPlayerColor,
			};
		case CHANGE_FIRST_PLAYER_POINTS:
			return {
				...state,
				firstPlayerPoints: action.newFirstPlayerPoints,
			};
		case CHANGE_SECOND_PLAYER_POINTS:
			return {
				...state,
				secondPlayerPoints: action.newSecondPlayerPoints,
			};
		case CHANGE_FIRST_PLAYER_TIME:
			return {
				...state,
				firstPlayerTime: action.newFirstPlayerTime,
			};
		case CHANGE_SECOND_PLAYER_TIME:
			return {
				...state,
				secondPlayerTime: action.newSecondPlayerTime,
			};
		case CHANGE_MOVES:
			return {
				...state,
				moves: action.newMoves,
			};
		case CHANGE_TURN_NUMBER:
			return {
				...state,
				turnNumber: action.newTurnNumber,
			};
		case CHANGE_CAN_LEAVE:
			return {
				...state,
				canLeave: !state.canLeave,
			};
		default:
			return state;
	}
}
