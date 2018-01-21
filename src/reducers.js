import { combineReducers } from 'redux'
import {
  ADD_MESSAGES, SET_ROOM_INFO, LOGIN, SET_CURRENT_USERS
} from './actions'

function messages(state = [], action) {
  switch (action.type) {
    case ADD_MESSAGES:
      return [
        ...state,
        ...action.messages
      ]
    default:
      return state
  }
}

function room(state = { name: '', creation_time: Date.now(), current_users: [], _id: -1 }, action) {
  switch (action.type) {
    case SET_ROOM_INFO:
      return action.room
    case SET_CURRENT_USERS:
      return { ...state, current_users: action.users }
    default:
      return state
  }
}

function isLoggedIn(state = false, action) {
  switch (action.type) {
    case LOGIN:
      return true
    default:
      return state
  }
}

export default combineReducers({ messages, room, isLoggedIn })
