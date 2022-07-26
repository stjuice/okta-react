import React, { useCallback, useState } from 'react';
import { withOktaAuth } from '@okta/okta-react';

const SignInWidget = ({ oktaAuth, onSuccess, onError }) => {
  const [state, setState] = useState({
    sessionToken: null,
    email: '',
    password: ''
  });

  const handleEmailChange = useCallback(event => {
    setState({ ...state, email: event.target.value });
  }, [state])

  const handlePasswordChange = useCallback(event => {
    setState({ ...state, password: event.target.value });
  }, [state])

  const signIn = useCallback(async (event) => {
    event.preventDefault();
    const transaction = await oktaAuth.signIn({
      username: state.email,
      password: state.password
    });

    if (transaction.status === 'SUCCESS') {
      onSuccess(transaction);
    } else {
      onError(transaction);
    }
  }, [oktaAuth, state, onSuccess, onError])

  return (
    <form onSubmit={signIn} className="login login-form">
      <h2>Log In</h2>
      <p>Please login to continue</p>
      <label className="full-width-input">
        Email
      </label>
      <input type="text" placeholder="Email" value={state.email} onChange={handleEmailChange} required />
      <label className="full-width-input">
        Password
      </label>
      <input type="password" placeholder="Password" value={state.password} onChange={handlePasswordChange} required autoComplete="off" />
      <button className="btn btn-login">Login</button>
    </form>
  );
};

export default withOktaAuth(SignInWidget);