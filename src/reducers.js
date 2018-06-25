import { combineReducers } from 'redux'
import {
  ADD_MESSAGES, SET_ROOM_INFO, SET_CURRENT_USERS,
  MEMBERS, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_ERROR,
  CLEAR_LOGIN_ERROR, CREATE_ROOM_START, CREATE_ROOM_FAILURE,
  CREATE_ROOM_SUCCESS, CREATE_ROOM_NAME_ERROR, CREATE_ROOM_SHORTID_ERROR, CREATE_ROOM_RESET
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

function room(state = { name: '', creation_time: Date.now(), current_users: [], shortid: '' }, action) {
  switch (action.type) {
    case SET_ROOM_INFO:
      return { ...action.room, current_users: [] }
    case SET_CURRENT_USERS:
      return { ...state, current_users: action.users }
    default:
      return state
  }
}

function login(state = { error: '', signed_in: false }, action) {
  switch (action.type) {
    case LOGIN_FAILURE:
      return { ...state, signed_in: false }
    case LOGIN_SUCCESS:
      return { ...state, signed_in: true }
    case LOGIN_ERROR:
      return { ...state, error: action.text }
    case CLEAR_LOGIN_ERROR:
      return { ...state, error: '' }
    default:
      return state
  }
}

function create_room(state = { name_error: '', shortid_error: '', loading: false, done: false }, action) {
  switch (action.type) {
    case CREATE_ROOM_START:
      return { ...state, loading: true }
    case CREATE_ROOM_SUCCESS:
      return { ...state, loading: false, done: true }
    case CREATE_ROOM_FAILURE:
      return { ...state, name_error: 'An error occured.', loading: false }
    case CREATE_ROOM_RESET:
      return { ...state, done: false }
    case CREATE_ROOM_NAME_ERROR:
      return { ...state, name_error: action.text, loading: false }
    case CREATE_ROOM_SHORTID_ERROR:
      return { ...state, shortid_error: action.text, loading: false }
    default:
      return state
  }
}

function modals(state = { signin: false, members: false }, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, signin: false }
    case LOGIN_FAILURE:
      return { ...state, signin: true }
    case MEMBERS:
      return { ...state, members: !state.members }
    default:
      return state
  }
}

export default combineReducers({ messages, room, modals, login, create_room })
