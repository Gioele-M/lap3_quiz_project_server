const express = require("express");
const router = express.Router();

const User = require("../models/User");


//////////////////////////////////

async function indexUsers(req, res){
    try{
        const users = await User.all
        res.status(200).json(users)
    }catch(err){
        res.status(500).send(err)
    }
}
// UPDATE

async function getUser(req, res) {
  try{
      const username = req.params.username
      const user = await User.findByUsername(username)
      res.status(200).json(user)
  } catch (err) {
      res.status(404).json({err})
  }
}




module.exports = { indexUsers, getUser }

