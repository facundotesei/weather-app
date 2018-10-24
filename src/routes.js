import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';
import BoardList from './containers/board_list';
import BoardNew from './containers/board_new';
import BoardDetail from "./containers/board_detail";
import App from './components/app';


export const makeMainRoutes = () => {
  return (
    <Router history={history}>
        <div className="">
        <App />
        <Switch>
          <Route path="/boards/new" component={BoardNew}  />
          <Route path="/boards/:id" component={BoardDetail} />
          <Route path="/boards" component={BoardList} />
          <Route path="/" component={BoardList} />         
         </Switch>  
        </div>
    </Router>
  );
}
