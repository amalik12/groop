/*
 * action types
 */

export const ADD_MESSAGE = 'ADD_MESSAGE'
export const SET_USER_COUNT = 'SET_USER_COUNT'
export const SET_ROOM_INFO = 'SET_ROOM_INFO'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'

/*
 * action creators
 */

export function addMessage(message) {
  return { type: ADD_MESSAGE, message }
}

export function setUserCount(count) {
  return { type: SET_USER_COUNT, count }
}

export function setRoomInfo(room) {
  return { type: SET_ROOM_INFO, room }
}

export function toggleModal() {
  return { type: TOGGLE_MODAL }
}