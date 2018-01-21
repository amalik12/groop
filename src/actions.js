/*
 * action types
 */

export const ADD_MESSAGES = 'ADD_MESSAGES'
export const SET_CURRENT_USERS = 'SET_CURRENT_USERS'
export const SET_ROOM_INFO = 'SET_ROOM_INFO'
export const LOGIN = 'LOGIN'

/*
 * action creators
 */

export function addMessages(messages) {
  return { type: ADD_MESSAGES, messages }
}

export function setCurrentUsers(users) {
  return { type: SET_CURRENT_USERS, users }
}

export function setRoomInfo(room) {
  return { type: SET_ROOM_INFO, room }
}

export function login() {
  return { type: LOGIN }
}