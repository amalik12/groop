import { combineReducers } from 'redux'
import {
  ADD_MESSAGES, SET_ROOM_INFO, SIGNIN, SET_CURRENT_USERS, MEMBERS
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

function modals(state = { signin: true, members: false }, action) {
  switch (action.type) {
    case SIGNIN:
      return { ...state, signin: false }
    case MEMBERS:
      return { ...state, members: !state.members }
    default:
      return state
  }
}

export default combineReducers({ messages, room, modals })
