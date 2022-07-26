import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

const Admin = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const currentUserEmail = authState.idToken.claims.email;
  const currentUserName = authState.idToken.claims.name;

  const logout = async () => {
    await oktaAuth.signOut();
  };

  return (
    <div>
      <h2>Authorized Only</h2>
      <h1>Welcome {currentUserName}</h1>
      <p>Email: {currentUserEmail}</p>
      <button className="btn btn-logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Admin;