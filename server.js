
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


    socket.on('message', (message, inputRoom) => {
        console.log('the sent message was:' + message)


        if(message === 'Create room'){

            console.log('scope accessed')

            let roomCode = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)

            socket.join(`${roomCode}`)

            io.emit('responseCreateRoom', roomCode)

            io.to(roomCode).emit('responseJoinRoom', `Joined room ${roomCode}`)
        }

        if(message === 'Join room'){

            socket.join(inputRoom)

            // io.to(socket.id).emit('responseJoinRoom', `Joined room ${inputRoom}`)

            let room = io.sockets.adapter.rooms.get(inputRoom).size

            io.to(inputRoom).emit('responseJoinRoom', `${room}`)

        }



        socket.on('send-message', (message, room) => {

            // if no room passed send to everyone, otherwise just to room
            if(room === ''){
                socket.broadcast.emit('receive-message', message)
            }else{
                socket.to(room).emit('receive-message', message)
            }
        })


    })
 
    socket.on('startGame', (message, room, cb)=>{

        console.log(message, room, cb)

        cb('The callback was called')

        const stringRoom = `${room}`

        // socket.to(stringRoom).emit('serverAuthToStartGame', message)

        io.sockets.in(stringRoom).emit('serverAuthToStartGame', message);

    })



    //probably need another input
    socket.on('finishGame', (playerName, playerScore, questionsAmount, cb)=>{

        

        console.log(playerName)
        
        
        
        const [id, room] = Array.from(socket.rooms)
        console.log(id, room)
        
        
        // Store the object of users with their results, once length of object = players in the room send answer back with object


        // THIS LINE THROWS A LOT OF ERRORS!!!
        let roomSize = io.sockets.adapter.rooms.get(room).size

        console.log('roomsize '+ roomSize)
        


        io.sockets.in(room).emit('playerHasCompleted', id, playerName, playerScore, questionsAmount, roomSize);


    })


    socket.on('everyoneIsDone', (data) => {

        console.log(data)

        const [id, room] = Array.from(socket.rooms)
        console.log(id, room)

        io.sockets.in(room).emit('showLeaderBoard', data)


    })


    /////////////////////////////////////////// NEED EVERYTHING TO BE IN TRY CATCH BLOCK!!! IF DATA IS NOT SENT PROPERLY FROM FRONTEND EVERYTHING BREAKS!!!!!!



    socket.on("disconnect", socket => { // runs when client disconnects
        console.log("K bye then");
    });
});

// ----

module.exports = server
