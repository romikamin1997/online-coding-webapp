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
  console.log("Fetching code block!")
  const data = await CodeBlock.find({}, { _id: 0, title: 1, code: 1 });
  res.send(data);
})

server.listen(port, () => console.log(`Listening on port ${port}`));

// SOCKET -------------------
// The amount of clients connected to the current io socket
let countClient = 0;
let latestCode = "";

io.on("connection", (socket) => {
  
  socket.emit('client-connected', {count : countClient, code : latestCode})
  
  if (countClient === 0) {
    console.debug("Mentor connected");
  }
  countClient++;
  
  socket.on('update-code', (code) => {
    console.debug("Recieved update-code event")
    latestCode = code
    io.emit('update-code', code)
  })
  
  socket.on('disconnect', () => {
    countClient--;
    if (countClient === 0) {
      latestCode = ""
    }
    console.debug("Client disconnected clientCount = " + countClient);
  });

});




