
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/users')

const authRoutes = require('./routes/authorisation')

const leaderRoutes = require('./routes/leader')

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/leaderboard', leaderRoutes)

app.get('/', (req, res) => res.send('Welcome to the library'))


// ----

//Socket io setup

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  }) // integrate our http server with a new instance of socket.io




// const socketRoute = io.of('/game')

io.on('connection', socket => {
    console.log("'Ello, who's this we got here?" + socket.id) // runs when client first connects


    const participantCount = io.engine.clientsCount
    io.emit('admin-message', `There is ${participantCount} x friend here now!`)


    socket.on('message', (message) => {
        console.log('the sent message was:' + message)


        if(message === 'Create room'){

            console.log('scope accessed')

            io.emit('responseCreateRoom', 'The room is being created')
        }


    })


    socket.on("disconnect", socket => { // runs when client disconnects
        console.log("K bye then");
    });
});

// ----

module.exports = server
