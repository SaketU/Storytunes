import axios from 'axios';

require('dotenv').config();

export const clientId = process.env.SPOTIFY_CLIENT_ID
export const redirectUri = "http://localhost:3000/callback";
export const authEndpoint = "https://accounts.spotify.com/authorize";
export const scopes = ["playlist-modify-public", "playlist-modify-private"];

//Sends refresh token to Spotify API to get new access token
export const refreshAccessToken = async (refreshToken, setAccessToken) => {
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      }
    });

    const { access_token, expires_in } = response.data;
    setAccessToken(access_token);
    localStorage.setItem('spotifyAccessToken', access_token);
    localStorage.setItem('spotifyExpiresAt', Date.now() + expires_in * 1000);
    scheduleTokenRefresh(Date.now() + expires_in * 1000, refreshToken, setAccessToken);
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
};

export const scheduleTokenRefresh = (expiresAt, refreshToken, setAccessToken) => {
  const timeout = expiresAt - Date.now() - 60000;
  setTimeout(() => {
    refreshAccessToken(refreshToken, setAccessToken);
  }, timeout);
};

//Logs into Spotify account
export const handleLogin = () => {
  const authUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(" "))}`;
  window.location.href = authUrl;
};
