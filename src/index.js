import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import chat from './reducers'
import { login } from './actions';
let store = createStore(chat);
if (localStorage.getItem('token')) {
    fetch("/auth", { method: 'HEAD', headers: { 'Authorization': localStorage.getItem('token')} })
    .then(
        (result) => {
            if (result.status === 200) {
                store.dispatch(login());
            } else {
                localStorage.removeItem('token');
            }
        },
        (error) => {
            console.log(error);
        }
    )
}
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();