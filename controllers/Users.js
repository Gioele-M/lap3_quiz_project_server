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

async function createNewUser(req, res) {
  try{
      const username = req.body.username;
      const user = await User.createUser(username);
      res.status(201).json(user)
  } catch (err) {
      res.status(422).json({err})
  }
}

async function updateScore(req, res) {
  try{
      const username = req.body.username
      const percentage = req.body.score
      const user = await User.updateUserScore(username, percentage)
      res.status(200).json(user)
  } catch (err) {
      res.status(422).json({err})
  }
}

async function leaderboard(req, res) {
  try{
      const topTen = await User.usersTopTen
      res.status(200).json(topTen)
  } catch (err) {
      res.status(404).json({err})
  }
}


module.exports = { indexUsers, createNewUser, getUser, updateScore, leaderboard }

