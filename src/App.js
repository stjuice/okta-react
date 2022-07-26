import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter, useHistory } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import {
  LoginCallback,
  Security,
  SecureRoute,
} from '@okta/okta-react';
import Home from './Home';
import AzureLogin from './components/AzureLogin';
import Login from './components/Login';
import Admin from './components/pages/Admin';

const redirectTo = '/admin';
const yourOktaDomain = 'dev-37059932.okta.com';

// configurations for OKTA
const CLIENT_ID = '0oa5u8uxdeFk3RGB05d7';
const ISSUER = `https://${yourOktaDomain}/oauth2/default`;
const REDIRECT_URI = window.location.origin + redirectTo;

const oktaAuth = new OktaAuth({
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  postLogoutRedirectUri: REDIRECT_URI,
});

// configurations for Azure IDP
const azureClientId = 'e2a4fc73-ac23-4336-b8e7-c5185b215c15';
const azureRedirectUrl = 'https://dev-37059932.okta.com/oauth2/v1/authorize/callback';
const authorizationUrl = `https://dev-37059932.okta.com/oauth2/v1/authorize?idp=0oa5v6m8duk9UQEJp5d7&client_id=0oa5u8uxdeFk3RGB05d7&response_type=id_token&response_mode=fragment&scope=openid%20email&redirect_uri=${azureRedirectUrl}&state=WM6D&nonce=YsG76jo`;

const oktaAuthAzure = new OktaAuth({
  issuer: ISSUER,
  clientId: azureClientId,
  redirectUri: azureRedirectUrl,
  state: 'WM6D',
  otp: 'YsG76jo'
});

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };
  const onAuthRequired = function () {
    history.push('/login')
  }
  const onAuthRequiredAzure = function () {
    history.push('/azure-login')
  }

  return (
    <div className="App">
      <div className="page">
        <Link to="/">
          <button className="btn" type="button">
            Home
          </button>
        </Link>
        <div className="content">
          <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={onAuthRequired}>
            <Route path="/" exact={true} component={Home} />
            <Route path='/login' exact={true} component={Login} />
            <SecureRoute path="/admin" exact={true} component={Admin} />
            <Route path={redirectTo} component={LoginCallback} />
            <Security oktaAuth={oktaAuthAzure} restoreOriginalUri={restoreOriginalUri} onAuthRequired={onAuthRequiredAzure}> 
              <Route path='/azure-login' exact={true} component={AzureLogin} />
              <a href={authorizationUrl}>Sign in with Identity Provider</a>
            </Security>
          </Security>
        </div>
      </div>
    </div>
  );
}

const AppWithRouterAccess = withRouter(App);

class RouterApp extends Component {
  render() {
    return (<Router><AppWithRouterAccess /></Router>);
  }
}

export default RouterApp;
