
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());


const userModel = require('./models/User')

let toSend

userModel.all.then((d) => {toSend = d})

console.log(typeof toSend)

// Add routes here

server.get('/', (req, res) => res.send('Welcome to the library'))

server.get('/try', (req,res) => res.send(toSend))



module.exports = server
