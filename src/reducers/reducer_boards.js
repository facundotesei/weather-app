import _ from "lodash";
import { FETCH_BOARDS, FETCH_BOARD, DELETE_BOARD, ADD_LOCACION } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_BOARD:
      return _.omit(state, action.payload);
    case FETCH_BOARD:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_BOARDS:
      return _.mapKeys(action.payload.data, "id");
    case ADD_LOCACION:
      return { ...state, [action.payload.data.id]: action.payload.data };
    default:
      return state;
  }
}
