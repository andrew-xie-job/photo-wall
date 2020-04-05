import React from 'react'
import ReactDOM from 'react-dom'
import './styles/stylesheet.css'
import './css/tailwind.css';
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './Components/Redux/reducer'
import {Provider} from 'react-redux'
import App from './Components/App'
import thunk from 'redux-thunk'

import Firebase, { FirebaseContext } from './Components/Firebase';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </FirebaseContext.Provider>
    </Provider>,
    document.getElementById('root')
);
