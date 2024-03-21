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


app.get('/code-block-titles', async (_, res) => {
  console.log("Fetching code block titles!")
  const data = await CodeBlock.find({})
  res.send(data.map(obj => obj.title));
})


server.listen(port, () => console.log(`Listening on port ${port}`));


