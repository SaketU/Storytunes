const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = "http://localhost:3000/callback";

//Axios sends authorization code to Spotify API to get access and refresh tokens
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      }
    });

    const { access_token, refresh_token, expires_in } = response.data;

    res.redirect(`/auth-success?access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`);
  } catch (error) {
    console.error('Error exchanging code for tokens:', error.response ? error.response.data : error.message);
    res.status(400).send('Failed to exchange authorization code for tokens.');
  }
});

//Gets new access token by sending a POST request to Spotify API using the refresh token
app.get('/refresh_token', async (req, res) => {
  const refreshToken = req.query.refresh_token;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      }
    });

    const { access_token, refresh_token: newRefreshToken } = response.data;

    res.json({
      access_token: access_token,
      refresh_token: newRefreshToken || refreshToken
    });
  } catch (error) {
    console.error('Error refreshing access token:', error.response ? error.response.data : error.message);
    res.status(400).send('Failed to refresh access token.');
  }
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
