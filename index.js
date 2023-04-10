import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignIn from './login';

function getToken() {
  return localStorage.getItem('token');
}

const authenticated = getToken() !== null;

ReactDOM.render(
  <React.StrictMode>
    {authenticated ? <App /> : <SignIn />}
  </React.StrictMode>,
  document.getElementById('root')
);
