
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const userRoutes = require('./routes/users')


server.use('/users', userRoutes)

// const userModel = require('./models/User')
// let toSend
// try{
//     userModel.all.then((d) => {toSend = d}).catch(console.log('error from here (serverjs)'))
// }catch(err){
//     console.log(err)
// }

// server.get('/try', (req,res) => res.send(toSend))

// Add routes here

server.get('/', (req, res) => res.send('Welcome to the library'))




module.exports = server
