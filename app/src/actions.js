/*
 * action types
 */

export const ADD_MESSAGES = 'ADD_MESSAGES';
export const SET_CURRENT_USERS = 'SET_CURRENT_USERS';
export const SET_TYPING_USERS = 'SET_TYPING_USERS';
export const SET_ROOM_INFO = 'SET_ROOM_INFO';
export const SIGNIN = 'SIGNIN';
export const MEMBERS = 'MEMBERS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';
export const CREATE_ROOM_START = 'CREATE_ROOM_START';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAILURE = 'CREATE_ROOM_FAILURE';
export const CREATE_ROOM_RESET = 'CREATE_ROOM_RESET';
export const CREATE_ROOM_NAME_ERROR = 'CREATE_ROOM_NAME_ERROR';
export const CREATE_ROOM_SHORTID_ERROR = 'CREATE_ROOM_SHORTID_ERROR';

/*
 * action creators
 */

export function addMessages(messages) {
  return { type: ADD_MESSAGES, messages }
}

export function setCurrentUsers(users) {
  return { type: SET_CURRENT_USERS, users }
}

export function setTypingUsers(users) {
  return { type: SET_TYPING_USERS, users }
}

export function setRoomInfo(room) {
  return { type: SET_ROOM_INFO, room }
}

export function loginFailure() {
  return { type: LOGIN_FAILURE }
}

export function loginSuccess() {
  return { type: LOGIN_SUCCESS }
}

export function loginError(text) {
  return { type: LOGIN_ERROR, text }
}

export function clearLoginError() {
  return { type: CLEAR_LOGIN_ERROR }
}

export function createRoomStart() {
  return { type: CREATE_ROOM_START }
}

export function createRoomSuccess() {
  return { type: CREATE_ROOM_SUCCESS }
}

export function createRoomFailure() {
  return { type: CREATE_ROOM_FAILURE }
}

export function createRoomReset() {
  return { type: CREATE_ROOM_RESET }
}

export function setNameError(text) {
  return { type: CREATE_ROOM_NAME_ERROR, text }
}

export function setShortidError(text) {
  return { type: CREATE_ROOM_SHORTID_ERROR, text }
}

export function members() {
  return { type: MEMBERS }
}

export function createRoom(name, shortid) {
  return (dispatch) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    dispatch(createRoomStart())
    return fetch("/api/v1/rooms", { method: 'POST', body: JSON.stringify({ name: name, shortid: shortid }), headers: myHeaders })
    .then((result) => {
      if (result.status !== 200) {
        dispatch(createRoomFailure())
        return Promise.reject(result.status);
      }
      dispatch(createRoomSuccess())
      return result.json()
    })
    .then(result => dispatch(setRoomInfo(result)))
    .catch(error => { console.error(error); dispatch(createRoomFailure()) })
  }
}

export function getRoomInfo(shortid) {
  return (dispatch) => {
    return fetch("/api/v1/rooms/" + shortid)
    .then(
      result => result.json(),
      error => console.error(error)
    )
    .then((data) => {
      dispatch(setRoomInfo(data));
    })
  }
}

export function getRoomMessages(shortid) {
  return (dispatch) => {
    return fetch("/api/v1/rooms/" + shortid + '/messages', { headers: { 'Authorization': localStorage.getItem('token') } })
    .then(
      result => result.json(),
      error => console.error(error)
    )
    .then((data) => {
      dispatch(addMessages(data));
    })
  }
}

export function auth(token) {
  return (dispatch) => {
    return fetch("/auth", { method: 'HEAD', headers: { 'Authorization': localStorage.getItem('token') } })
    .then((result) => {
      if (result.status >= 400 && result.status < 600) {
        dispatch(loginFailure())
        return Promise.reject(result.status);
      }
      dispatch(loginSuccess())
      return Promise.resolve(result);
    },
      error => Promise.reject(error)
    )
  }
}

export function checkUsername(username) {
  return (dispatch) => {
    return fetch("/api/v1/users?name=" + username, { method: 'HEAD' })
    .then(
      (result) => {
        if (result.status >= 400 && result.status < 600) {
          return Promise.resolve(result.status);
        }
        dispatch(loginError('Username already taken'));
        return Promise.reject(result.status);
      },
      (error) => {
        console.error(error);
      }
    )
  }
}

export function checkShortid(shortid) {
  return (dispatch) => {
    return fetch("/api/v1/rooms?shortid=" + shortid, { method: 'HEAD' })
      .then(
        (result) => {
          if (result.status >= 400 && result.status < 600) {
            return Promise.resolve(result.status);
          }
          dispatch(setShortidError('URL already taken'));
          return Promise.reject(result.status);
        },
        (error) => {
          console.error(error);
        }
      )
  }
}

export function login(username, password, socket) {
  return (dispatch) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return fetch("/login", { method: 'POST', body: JSON.stringify({ name: username, password: password }), headers: myHeaders })
      .then((result) => {
        if (result.status >= 400 && result.status < 600) {
          dispatch(loginFailure());
          dispatch(loginError('Username/password is incorrect'));
          return Promise.reject(result.status);
        }
        return result.json();
      },
      error => Promise.reject(error)
    ).then((result) => {
      localStorage.setItem('token', result.token);
      dispatch(loginSuccess());
    })
  }
}

export function register(username, password, socket) {
  return (dispatch) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return fetch("/register", { method: 'POST', body: JSON.stringify({ name: username, password: password }), headers: myHeaders })
      .then((result) => {
        if (result.status >= 400 && result.status < 600) {
          dispatch(loginFailure());
          dispatch(loginError('An error occured.'));
          return Promise.reject(result.status);
        }
        return result.json();
      },
        error => Promise.reject(error)
      ).then((result) => {
        localStorage.setItem('token', result.token);
        dispatch(loginSuccess())
      })
  }
}