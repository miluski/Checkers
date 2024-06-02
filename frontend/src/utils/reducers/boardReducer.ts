import {
  CHANGE_SELECTED_PIECE,
  CHANGE_PAWN_TO_BEAT,
  CHANGE_GAME_ID,
  CHANGE_CURRENT_PLAYER_COLOR,
  CHANGE_IS_GAME_STARTED,
  CHANGE_PAWNS_POSITIONS,
  CHANGE_IS_GAME_ENDED,
} from "../ActionTypes";
import { BoardAction } from "../types/Action";

const initialState = {
  selectedPiece: null,
  pawnToBeat: null,
  gameId: "",
  currentPlayerColor: "blue",
  isGameStarted: false,
  isGameEnded: false,
  pawnsPositions: [
    {
      tabIndex: 0,
      dataRow: 0,
      dataCol: 0,
      key: "",
      className: "",
      getAttribute: undefined,
    },
  ],
};

export function boardReducer(state = initialState, action: BoardAction) {
  switch (action.type) {
    case CHANGE_SELECTED_PIECE:
      return {
        ...state,
        selectedPiece: action.newSelectedPiece,
      };
    case CHANGE_PAWN_TO_BEAT:
      return {
        ...state,
        pawnToBeat: action.newPawnToBeat,
      };
    case CHANGE_GAME_ID:
      return {
        ...state,
        gameId: action.newGameId,
      };
    case CHANGE_CURRENT_PLAYER_COLOR:
      return {
        ...state,
        currentPlayerColor: action.newCurrentPlayerColor,
      };
    case CHANGE_IS_GAME_STARTED:
      return {
        ...state,
        isGameStarted: action.newIsGameStarted,
      };
    case CHANGE_PAWNS_POSITIONS:
      return {
        ...state,
        pawnsPositions: action.newPawnsPositions,
      };
    case CHANGE_IS_GAME_ENDED:
      return {
        ...state,
        isGameEnded: action.newIsGameEnded,
      };
    default:
      return state;
  }
}
