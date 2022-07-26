import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import SignInWidget from './SignInWidget';

function Login() {
  const { oktaAuth } = useOktaAuth();

  const onSuccess = function (res) {
    if (res.status === 'SUCCESS') {
      return oktaAuth.signInWithRedirect({
        sessionToken: res.sessionToken
      });
    }
  }

  const onError = function (err) {
    console.log('error logging in', err);
  }

  return (
    <SignInWidget
      onSuccess={onSuccess}
      onError={onError} />);
}

export default Login;