import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const PlayQueue = ({ queue }) => {
  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: '10px' }}>Play Queue</Typography>
      <List>
        {queue.map((song, index) => (
          <ListItem key={index}>
            <ListItemText primary={song.title} secondary={song.artist} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PlayQueue;
