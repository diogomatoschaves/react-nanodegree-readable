import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import reducers from './reducers/index.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { logger } from 'redux-logger'


const reduxEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {valueCategory: 1, 
    valueSort: 1, 
    posts: [], 
    comments: [], 
    categoryOptions: [{ key: 1, text: 'All Posts', value: 1 }]
  },
  reduxEnhancers(applyMiddleware(thunk), applyMiddleware(logger))
);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));

