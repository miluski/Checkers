import { Action } from "./Action";
import { CHANGE_NICKNAME, CHANGE_ENEMY_NICKNAME, CHANGE_PLAYER_COLOR } from "./ActionTypes";

const initialState = {
	nickname: "",
	enemyNickname: "",
	playerColor: "blue"
};

export default function appReducer(state = initialState, action: Action) {
	switch (action.type) {
		case CHANGE_NICKNAME:
			return {
				...state,
				nickname: action.newNickname,
			};
		case CHANGE_ENEMY_NICKNAME:
			return {
				...state,
				enemyNickname: action.newEnemyNickname,
			};
		case CHANGE_PLAYER_COLOR:
			return {
				...state,
				playerColor: action.newPlayerColor
			}
		default:
			return state;
	}
}
