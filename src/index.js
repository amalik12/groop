import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import chat from './reducers';
import { login, addMessages, setRoomInfo, setUserCount } from './actions';

let store = createStore(chat);
var socket = io({ autoConnect: false });

socket.on('message', function (msg) {
  store.dispatch(addMessages([msg]))
});

socket.on('disconnect', function () {
  socket.emit('user disconnect', 'word');
});

socket.on('user count', function (count) {
  store.dispatch(setUserCount(count))
});

fetch("/api/v1/room/5a4d7a61caa2040616b09e75")
.then(
  (result) => {
    if (result.status === 200) {
      return result.json();
    }
  },
  (error) => {
    console.log(error);
  }
)
.then((data) => {
  store.dispatch(setRoomInfo(data));
  if (localStorage.getItem('token'))
    return fetch("/auth", { method: 'HEAD', headers: { 'Authorization': localStorage.getItem('token') } });
  Promise.resolve(-1);
})
.then(
  (result) => {
    if (result !== -1 && result.status === 200) {
      store.dispatch(login());
      return fetch("/api/v1/room/" + store.getState().room._id + '/messages', { headers: { 'Authorization': localStorage.getItem('token') } })
    } else {
      localStorage.removeItem('token');
    }
  },
  (error) => {
    console.log(error);
  }
)
.then(
  (result) => {
    if (result.status === 200) {
      result.json().then((data) => {
        store.dispatch(addMessages(data));
        socket.open();
      })
    } else {
      console.log('Error retrieving messages');
      // TODO: alert user
    }
  },
  (error) => {
    console.log(error);
  }
)

ReactDOM.render(<Provider store={store}><App socket={socket} /></Provider>, document.getElementById('root'));
registerServiceWorker();