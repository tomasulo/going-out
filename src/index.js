import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { App } from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {eventStore} from "./reducers/index";

ReactDOM.render(
    <Provider store={eventStore}>
        <App/>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
