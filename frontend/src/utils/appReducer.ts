import { Action } from "./Action";
import {
  CHANGE_EMAIL,
  CHANGE_NICKNAME,
  CHANGE_OPERATION,
  CHANGE_PASSWORD,
} from "./ActionTypes";

const initialState = {
  nickname: "",
  email: "",
  password: "",
  operation: "login",
};

export function appReducer(state = initialState, action: Action) {
  switch (action.type) {
    case CHANGE_NICKNAME:
      return {
        ...state,
        nickname: action.newNickname,
      };
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.newEmail,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.newPassword,
      };
    case CHANGE_OPERATION:
      return {
        ...state,
        operation: action.newOperation,
      };
    default:
      return state;
  }
}
