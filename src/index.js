import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { App } from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {eventStore} from "./reducers/index";
import 'semantic-ui-css/semantic.min.css';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-56053032-2');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
    <Provider store={eventStore}>
        <App/>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
