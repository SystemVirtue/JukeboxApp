const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3001;

let playQueue = [];

app.get('/', (req, res) => {
  res.send('Jukebox Backend Running');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('queueUpdate', playQueue);

  socket.on('requestSong', (song) => {
    if (!playQueue.some((s) => s.title === song.title && s.artist === song.artist)) {
      playQueue.push(song);
      io.emit('queueUpdate', playQueue);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.post('/request', (req, res) => {
  const song = req.body;
  if (!playQueue.some((s) => s.title === song.title && s.artist === song.artist)) {
    playQueue.push(song);
    io.emit('queueUpdate', playQueue);
    res.status(201).send('Song added to queue');
  } else {
    res.status(409).send('Song already in queue');
  }
});

app.post('/admin/reorder', (req, res) => {
  const { fromIndex, toIndex } = req.body;
  if (fromIndex < 0 || toIndex < 0 || fromIndex >= playQueue.length || toIndex >= playQueue.length) {
    return res.status(400).send('Invalid indices');
  }
  const [movedSong] = playQueue.splice(fromIndex, 1);
  playQueue.splice(toIndex, 0, movedSong);
  io.emit('queueUpdate', playQueue);
  res.status(200).send('Queue reordered');
});

app.post('/admin/remove', (req, res) => {
  const { index } = req.body;
  if (index < 0 || index >= playQueue.length) {
    return res.status(400).send('Invalid index');
  }
  playQueue.splice(index, 1);
  io.emit('queueUpdate', playQueue);
  res.status(200).send('Song removed from queue');
});

app.post('/admin/set-default-playlist', async (req, res) => {
  const { playlistName, timePeriod } = req.body;
  try {
    await db.query('INSERT INTO default_playlists (playlist_name, time_period) VALUES ($1, $2) ON CONFLICT (time_period) DO UPDATE SET playlist_name = $1', [playlistName, timePeriod]);
    res.status(200).send('Default playlist set');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
