import axios from "axios";

export const ROOT_URL = 'http://localhost:8080/';
export const FETCH_BOARDS = "fetch_boards";
export const FETCH_BOARD = "fetch_board";
export const CREATE_BOARD = "create_board";
export const DELETE_BOARD = "delete_board";
export const ADD_LOCACION = "add_locacion";
export const REMOVE_LOCACION = "remove_locacion";

export function fetchBoardsByUser(id) {
  const request = axios.get(`${ROOT_URL}/boards?user=1`);

  return {
    type: FETCH_BOARDS,
    payload: request
  };
}

export function createBoard(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/boards`, values)
    .then(() => callback());

  return {
    type: CREATE_BOARD,
    payload: request
  };
}

export function fetchBoard(id) {
  const request = axios.get(`${ROOT_URL}/boards/${id}`);

  return {
    type: FETCH_BOARD,
    payload: request
  };
}

export function deleteBoard(id, callback) {
  const request = axios
    .delete(`${ROOT_URL}/boards/${id}`)
    .then(() => callback());

  return {
    type: DELETE_BOARD,
    payload: id
  };
}

// export function removeLocacion(id,lugarId, callback) {
//     const request = axios
//       .delete(`${ROOT_URL}/boards/${id}/removeLocacion?lugarId=${lugarId}`)
//       .then(() => callback());
  
//     return {
//       type: REMOVE_LOCACION,
//       payload: id
//     };
  
// }

export function addLocacion(id,lugar, callback) {
    const request = axios
      .get(`${ROOT_URL}/boards/${id}/addLocacion?lugar=${lugar}`)
      .then(() => callback());
  
    return {
      type: ADD_LOCACION,
      payload: id
    }; //Ver que payload mandarle al Reducer 
  
}

