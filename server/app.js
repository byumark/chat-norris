const range = require('lodash.range');
const random = require('lodash.random');
const express = require('express');
const cors = require('cors')
const app = express();

const randomQuoteGenerator = require('./randomQuoteGenerator.js');
const PORT = 8887;
let chats = createInitialChats();
let newChats = [];
kickOffRandomQuoteAdding();

// middleware
app.use(cors())

app.get('/messagesArchived', function (req, res) {
  res.send(chats);
});

app.get('/newMessages', (req, res) => {
  let chatsToSend = [].concat(newChats)
  newChats = [];
  res.send(chatsToSend);
});


app.listen(PORT, function () {
  console.log(`Chat Message generation server now listening at port ${PORT}`);
});


function createInitialChats() {
  return range(2, 10).map(randomQuoteGenerator);
}

// unintelligible reasons for randomizing how much data gets added when.
function kickOffRandomQuoteAdding() {
  setInterval(() => {
    if ((random(1, 4) === 4) && (newChats.length < 20)) {
      newChats.push(randomQuoteGenerator());
    }
  }, 5000)
}