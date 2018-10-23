import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import App from './components/app';
import history from './history';
import BoardList from './containers/board_list';
import BoardNew from './containers/board_new';
import BoardDetail from "./containers/board_detail";


export const makeMainRoutes = () => {
  return (
    <Router history={history}>
        <div className="container-fluid">
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
