const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
let messages = [], users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000);
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('join', (userName) => {
    users.push({ name: userName, id: socket.id });
    socket.broadcast.emit('message', {
      author: 'Chatbot',
      content: `<i>${userName} has joined the conversation!`,
    });
  });
  socket.on('message', (message) => {
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    if (users.length > 0) {
      userName = users.filter((user) => user.id === socket.id)[0].name;
      users = users.filter((user) => user.id !== socket.id);
      socket.broadcast.emit('message', {
        author: 'Chatbot',
        content: `<i>${userName} has left the conversation... :(`,
      });
    }
  });
});
