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

const io = require('socket.io')(3001, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

// The amount of clients connected to the current io socket
let countClient = 0;

let latestCodeVersion;

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
  const data = await CodeBlock.find({}, {_id: 0, title: 1, code: 1});
  res.send(data.map(obj => obj));
})

server.listen(port, () => console.log(`Listening on port ${port}`));

// SOCKET -------------------
  io.on("connection", (socket) => {
    if (countClient === 0) {
      //io.emit('code-unlocked', {uuid: 'server'})
      console.log("Client = Mentor");
    }
    countClient++;
    console.log("New client connected with clientCount = " + countClient);

    socket.on("disconnect", () => {
      console.log("Client disconnected clientCount = " + countClient );
      countClient--;
    });

  });




