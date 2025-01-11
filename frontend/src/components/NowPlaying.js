import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const NowPlaying = ({ song }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardContent>
        <Typography variant="h5">Now Playing</Typography>
        <Typography variant="h6">{song.title}</Typography>
        <Typography variant="subtitle1">{song.artist}</Typography>
        <img src={song.albumCover} alt="Album Cover" style={{ width: '100px', height: '100px' }} />
      </CardContent>
    </Card>
  );
};

export default NowPlaying;
