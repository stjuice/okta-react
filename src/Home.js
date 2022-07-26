import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page">
      <h1>Login with Okta</h1>
      <Link to="/admin">
        <button className="btn btn-login" type="button">
          Login
        </button>
      </Link>
      <Link to="/azure-login">
        <button className="btn btn-login azure" type="button">
          Login with Azure
        </button>
      </Link>
    </div>
  );
}

export default Home;