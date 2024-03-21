const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use(express.static('public'));
app.use(cors());
const server = http.createServer(app);



server.listen(port, () => console.log(`Listening on port ${port}`));


