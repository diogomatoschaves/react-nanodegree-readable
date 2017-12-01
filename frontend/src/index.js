import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './semantic.min.css';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import reducer from './reducers/index.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

// store = createStore(
//   reducer
// );


ReactDOM.render(
    <Router>
      <App />
    </Router>
    , document.getElementById('root'));

// <Provider store={store}>
// </Provider>