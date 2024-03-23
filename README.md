# online-coding-webapp (CODITOR)


https://github.com/romikamin1997/online-coding-webapp/assets/164326664/0c1eb60e-6592-42de-bf29-a7903bd8352e


## Welcome to Romi's Online Coditor Application!
This is a small web application that allow a shared coding session between a mentor
and multiple students, available [here](https://online-coding-webapp-production-1ae1.up.railway.app/)
The mentor will enter the website first and select a question he wants to test the student with,
then the student will select the same question.
The code editor is going to be readonly for the mentor while the student (or multiple students) can modify
the code.
Once the student has provided the right solution for the question, a smiley face will appear on the screen! :)

## Env Variables
### Server
Gets two environment variables, either specified by the .env file or via the command line when running npm start:
- `PORT`: the port the server will run on
- `MONGODB_URI`: the uri for your mongodb cluster
### Client
- `REACT_APP_BACKEN_URI`: the uri that of the server to send requests to

## Installation
To install and run this project - install dependencies using npm and then start your server/client by running:

```
// Server
$ cd server && npm install && npm start
// Client
$ cd client && npm install && npm start
```

## Tech Stack:
- NodeJs
- MongoDB
- React
- Socket.io
