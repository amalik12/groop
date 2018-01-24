import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import chat from './reducers';
import { signin, addMessages, setRoomInfo, setCurrentUsers } from './actions';

let store = createStore(chat);
var socket = io({ autoConnect: false });

socket.on('message', function (msg) {
  store.dispatch(addMessages([msg]))
});

socket.on('current users', function (users) {
  store.dispatch(setCurrentUsers(users))
});

fetch("/api/v1/room/5a4d7a61caa2040616b09e75")
.then(
  (result) => {
    if (result.status === 200) {
      return result.json();
    } else {
      throw new Error('cannot retrieve room');
    }
  },
  (error) => {
    throw error;
  }
)
.then((data) => {
  store.dispatch(setRoomInfo(data));
  ReactDOM.render(<Provider store={store}><App socket={socket} /></Provider>, document.getElementById('root'));
  registerServiceWorker();
  if (localStorage.getItem('token'))
    return fetch("/auth", { method: 'HEAD', headers: { 'Authorization': localStorage.getItem('token') } });
  throw new Error('not logged in');
  }, (error) => {
    throw error;
  }
)
.then(
  (result) => {
    if (result !== -1 && result.status === 200) {
      store.dispatch(signin());
      return fetch("/api/v1/room/" + store.getState().room._id + '/messages', { headers: { 'Authorization': localStorage.getItem('token') } })
    } else {
      localStorage.removeItem('token');
    }
  },
  (error) => {
    throw error;
  }
)
.then(
  (result) => {
    if (result.status === 200) {
      result.json().then((data) => {
        store.dispatch(addMessages(data));
        socket.open();
        socket.emit("user", { room: store.getState().room._id, user: localStorage.getItem('token') })
      })
    } else {
      console.log('Error retrieving messages');
      // TODO: alert user
    }
  },
  (error) => {
    throw error;
  }
)
.catch(error => { console.log(error); })
