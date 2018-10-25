import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import history from './history';
import BoardList from './containers/board_list';
import BoardNew from './containers/board_new';
import BoardDetail from "./containers/board_detail";
import App from './components/app';
import Callback from './auth0/callback/callback';
import Auth from './auth0/auth/auth';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
        <div>
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />         
        <Switch>
          <Route path="/boards/new" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <BoardNew auth={auth} {...props} />
            )
          )} />
          <Route path="/boards/:id" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <BoardDetail auth={auth} {...props} />
            )
          )} />
          <Route path="/boards" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <BoardList auth={auth} {...props} />
            )
          )} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>    
         </Switch>  
        </div>
    </Router>
  );
}
