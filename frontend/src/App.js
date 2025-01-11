import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import NowPlaying from './components/NowPlaying';
import PlayQueue from './components/PlayQueue';
import SearchTabs from './components/SearchTabs';

function App() {
  const currentSong = {
    title: 'Song Title',
    artist: 'Artist Name',
    albumCover: 'https://via.placeholder.com/100'
  };

  const queue = [
    { title: 'Next Song 1', artist: 'Artist 1' },
    { title: 'Next Song 2', artist: 'Artist 2' },
    { title: 'Next Song 3', artist: 'Artist 3' }
  ];

  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timer;
    const resetTimer = () => {
      clearTimeout(timer);
      setIdle(false);
      timer = setTimeout(() => setIdle(true), 120000); // 2 minutes
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, []);

  return (
    <div className="App">
      <img id="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Blason-argent-3-jumelles-gueules.svg/1200px-Blason-argent-3-jumelles-gueules.svg.png" alt="Logo" />
      {idle && (
        <div id="screensaver">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Blason-argent-3-jumelles-gueules.svg/1200px-Blason-argent-3-jumelles-gueules.svg.png" alt="Screensaver Logo" />
        </div>
      )}
      <Typography variant="h2">Welcome to the Jukebox App</Typography>
      <NowPlaying song={currentSong} />
      <PlayQueue queue={queue} />
      <SearchTabs />
    </div>
  );
}

export default App;
