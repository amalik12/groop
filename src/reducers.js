import { combineReducers } from 'redux'
import {
  ADD_MESSAGE, SET_USER_COUNT, SET_ROOM_INFO, TOGGLE_MODAL
} from './actions'

function messages(state = [], action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        ...state,
        action.message
      ]
    default:
      return state
  }
}

function num_users(state = 0, action) {
  switch (action.type) {
    case SET_USER_COUNT:
      return action.count
    default:
      return state
  }
}

function room(state = { name: '', creation_time: Date.now, current_users: [] }, action) {
  switch (action.type) {
    case SET_ROOM_INFO:
      return action.room
    default:
      return state
  }
}

function modalOpen(state = true, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return !state
    default:
      return state
  }
}

export default combineReducers({ messages, num_users, room, modalOpen })
