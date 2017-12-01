import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './semantic.min.css';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import reducers from './reducers/index.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers  } from 'redux'
import * as asyncInitialState from 'redux-async-initial-state';

const reducer = asyncInitialState.outerReducer(combineReducers({
  ...reducers
  
}));


store = createStore(
  reducer,
  compose(applyMiddleware(asyncInitialState.middleware(loadStore)))
);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));

