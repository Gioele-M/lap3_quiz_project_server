
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const userRoutes = require('./routes/users')

const authRoutes = require('./routes/authorisation')

const leaderRoutes = require('./routes/leader')

server.use('/users', userRoutes)
server.use('/auth', authRoutes)
server.use('/leaderboard', leaderRoutes)






// REGISTER USER REQUEST BODY: 
// {
//     "username": "Gio",
//     "email": "gio@gio.com",
//     "password": "pass"
// }

// LOGIN 
// {
//     "username": "Gio",
//     "password": "pass"
//   }










// const userModel = require('./models/User')
// let toSend
// try{
//     userModel.findByUsername('Adam10').then((d) => {
//         console.log(d)
//         toSend = d}).catch(console.log('error from here (serverjs)'))

// }catch(err){
//     console.log(err)
// }


// server.get('/try', (req,res) => res.send(toSend))

// Add routes here

server.get('/', (req, res) => res.send('Welcome to the library'))




module.exports = server
