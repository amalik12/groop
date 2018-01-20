/*
 * action types
 */

export const ADD_MESSAGES = 'ADD_MESSAGES'
export const SET_USER_COUNT = 'SET_USER_COUNT'
export const SET_ROOM_INFO = 'SET_ROOM_INFO'
export const LOGIN = 'LOGIN'

/*
 * action creators
 */

export function addMessages(messages) {
  return { type: ADD_MESSAGES, messages }
}

export function setUserCount(count) {
  return { type: SET_USER_COUNT, count }
}

export function setRoomInfo(room) {
  return { type: SET_ROOM_INFO, room }
}

export function login() {
  return { type: LOGIN }
}