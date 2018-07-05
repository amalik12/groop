import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import io from 'socket.io-client';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import chat from './reducers';
import { addMessages, setCurrentUsers, setTypingUsers } from './actions';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import CreateRoom from './components/CreateRoom/';

let store = createStore(chat, applyMiddleware(thunkMiddleware));
var socket = io({ autoConnect: false });

socket.on('message', function (msg) {
  store.dispatch(addMessages([msg]))
});

socket.on('current users', function (users) {
  store.dispatch(setCurrentUsers(users))
});

socket.on('typing', function (users) {
  store.dispatch(setTypingUsers(users))
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        {/* <Route exact path='/' component={Home} /> */}
        <Route exact path='/' component={CreateRoom} />
        <Route path='/:id' render={(props) => <App {...props} socket={socket} />} />
      </div>
    </BrowserRouter>
  </Provider>,
document.getElementById('root'));
registerServiceWorker();
