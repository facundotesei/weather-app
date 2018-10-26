import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../../history';
import axios from 'axios';
import { ROOT_URL } from '../../actions/index';
import  lowercase  from "lodash/lowerCase"
export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.apiUrl,
    responseType: 'token id_token',
    scope: 'openid email profile',
  });

  userProfile;

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login() {
    this.auth0.authorize()  
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        const headers = { 'Authorization': `Bearer ${authResult.accessToken}`}
        this.getProfile((err, {name, email}) => { 
          const user = {name, email};
          localStorage.setItem('name', name);
          localStorage.setItem('email', email);
          const nom = lowercase(name).replace(/ /g,'');  
          axios.post(`${ROOT_URL}/users`,user, { headers })
            .then((res) => {
              localStorage.setItem('userid', res.data.id);
              history.replace(`/boards/${nom}`);
            });
         })

      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    history.replace('/');
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getHeaders = () => {
     return { 'Authorization': `Bearer ${this.getAccessToken()}` }
  }

  getName = () => { return localStorage.getItem('name') }

  getEmail = () => { return localStorage.getItem('email') }

  getId  = () => { return localStorage.getItem('userid'); }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userid');
    localStorage.removeItem('name');
    localStorage.removeItem('email');

    this.userProfile = null;
    history.replace('/');
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
