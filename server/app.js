require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express');
const http = require('http');
const cors = require('cors');
const CodeBlock = require('./models/codeBlocks')
const port = process.env.PORT || 5001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(express.static('public'));
app.use(cors());

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})


async function connectDb() {
  try {
    mongoose.set('strictQuery', false)
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      ssl: true
    })
    console.log(`Database Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log('Database failed to connect')
    throw error
  }
}
connectDb()


app.get('/code-blocks', async (_, res) => {
  console.debug("Fetching code block!")
  // 0/1 will instruct the query to ignore or send the field respectively
  const data = await CodeBlock.find({}, { _id: 0, title: 1, code: 1 , solution: 1});
  res.send(data);
})

server.listen(port, () => console.log(`Listening on port ${port}`));

// SOCKET -------------------
// The amount of clients connected to the current io socket
let countClient = 0;
let latestCode = "";

io.on("connection", (socket) => {
  
  // Send a 'client-connected' event **only to newly connected client** 
  // containing the current number of connected client till now and the latest
  // code version updated by all clients.
  // Notice that latestCode could be empty. This will happen on the first connected client.
  socket.emit('client-connected', {count : countClient, code : latestCode})
  
  if (countClient === 0) {
    console.debug("Mentor connected");
  }
  countClient++;
  
  // We want to listen to the 'update-code' event sent by the clients connected to the socket
  // In order to change the latest code accordingly and then send an 'update-code' event
  // to **all** clients so we maintain synchronization in the client side.
  socket.on('update-code', (code) => {
    console.debug("Recieved update-code event")
    latestCode = code
    io.emit('update-code', latestCode)
  })
  
  socket.on('disconnect', () => {
    countClient--;
    // If all clients disconnect from the socket, latestCode should be deleted
    // so upon the next coding session the clients will recieve a fresh state from the
    // server.
    if (countClient === 0) {
      latestCode = ""
    }
    console.debug("Client disconnected clientCount = " + countClient);
  });

});




