import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reducers from "./reducers";
import 'bootstrap/dist/css/bootstrap.css';
import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
   
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    {routes}
  </Provider>,
  document.getElementById('root')
);
