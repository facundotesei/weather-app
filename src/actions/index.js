import axios from "axios";

export const ROOT_URL = 'https://challenge-weather-api.herokuapp.com';
export const FETCH_BOARDS = "fetch_boards";
export const FETCH_BOARD = "fetch_board";
export const CREATE_BOARD = "create_board";
export const DELETE_BOARD = "delete_board";
export const ADD_LOCACION = "add_locacion";
export const REMOVE_LOCACION = "remove_locacion";


export function fetchBoardsByUser(id, headers) {
  const request = axios.get(`${ROOT_URL}/boards?user=${id}`, { headers });

  return {
    type: FETCH_BOARDS,
    payload: request
  };
}

export function createBoard(values, id, headers, callback) {
  const request = axios
    .post(`${ROOT_URL}/boards?user=${id}`, values, { headers })
    .then(() => callback());

  return {
    type: CREATE_BOARD,
    payload: request
  };
}

export function fetchBoard(id, headers) {
  const request = axios.get(`${ROOT_URL}/boards/${id}`, { headers });

  return {
    type: FETCH_BOARD,
    payload: request
  };
}

export function deleteBoard(id, userId, headers, callback) {
  axios.delete(`${ROOT_URL}/boards/${id}?user=${userId}`, { headers })
       .then(() => callback());

  return {
    type: DELETE_BOARD,
    payload: id
  };
}

export function addLocacion(id, lugar, headers) {
  const request = axios
    .get(`${ROOT_URL}/boards/${id}/addLocacion?lugar=${lugar}`, { headers });
  
    return {
      type: ADD_LOCACION,
      payload: request
    }; 
  
}

