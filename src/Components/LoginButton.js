import React from 'react';
import { handleLogin } from '../api/spotify_api';

const LoginButton = () => (
  <button
    onClick={handleLogin}
    style={{
      padding: '10px 20px',
      borderRadius: '20px',
      border: '2px solid black',
      backgroundColor: 'green',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      width: '60%',
      boxSizing: 'border-box',
    }}
  >
    Login to Spotify
  </button>
);

export default LoginButton;
