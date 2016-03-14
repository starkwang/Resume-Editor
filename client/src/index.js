import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
//import Immutable from 'immutable';
import App from './containers/App'
import Reducers from './reducers/reducers';
import thunk from 'redux-thunk';

let store = createStore(Reducers, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);