import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  refreshAccessToken,
  scheduleTokenRefresh,
} from '../api/spotify_api';
import LoginButton from './LoginButton';
import SearchBar from './SearchBar';
import SongTable from './SongTable';
import BackgroundImages from './BackgroundImages';

const Body = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('');
  const [songs, setSongs] = useState([]);
  const [searchConducted, setSearchConducted] = useState(false);
  const [showImages, setShowImages] = useState(true);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.substring(1));
    const accessTokenFromUrl = hash.get('access_token');
    const refreshTokenFromUrl = hash.get('refresh_token');
    const expiresInFromUrl = hash.get('expires_in');

    if (accessTokenFromUrl) {
      setAccessToken(accessTokenFromUrl);
      setRefreshToken(refreshTokenFromUrl);
      setIsLoggedIn(true);
      localStorage.setItem('spotifyAccessToken', accessTokenFromUrl);
      localStorage.setItem('spotifyRefreshToken', refreshTokenFromUrl);
      const expiresAt = Date.now() + parseInt(expiresInFromUrl) * 1000;
      localStorage.setItem('spotifyExpiresAt', expiresAt);
      scheduleTokenRefresh(expiresAt, refreshTokenFromUrl, setAccessToken);
    } else {
      const storedToken = localStorage.getItem('spotifyAccessToken');
      const storedRefreshToken = localStorage.getItem('spotifyRefreshToken');
      const expiresAt = localStorage.getItem('spotifyExpiresAt');

      if (storedToken && storedRefreshToken) {
        if (Date.now() > expiresAt) {
          refreshAccessToken(storedRefreshToken, setAccessToken);
        } else {
          setAccessToken(storedToken);
          setRefreshToken(storedRefreshToken);
          setIsLoggedIn(true);
          scheduleTokenRefresh(expiresAt, storedRefreshToken, setAccessToken);
        }
      }
    }
  }, [router]);

  const handleEnter = async () => {
    if (!accessToken || !theme) return;

    setSearchConducted(true);
    setSongs([]);
    setShowImages(false);

    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          q: theme,
          type: 'track',
          limit: 10
        }
      });

      setSongs(response.data.tracks.items);
      setTheme('');
    } catch (error) {
      console.error('Error fetching songs:', error);
      if (error.response.status === 401) {
        await refreshAccessToken(refreshToken, setAccessToken);
        handleEnter();
      }
    }
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    setSearchConducted(false);
  };

  return (
    <div className="cover-background">
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {showImages && <BackgroundImages />}
        <div style={{ position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          {!isLoggedIn ? (
            <LoginButton />
          ) : (
            <div className="w-full max-w-md" style={{ textAlign: 'center' }}>
              <SearchBar theme={theme} handleThemeChange={handleThemeChange} handleEnter={handleEnter} />
              <div className="mt-4">
                {songs.length > 0 ? (
                  <SongTable songs={songs} />
                ) : (
                  searchConducted && <p>No songs found. Try searching for something else.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
