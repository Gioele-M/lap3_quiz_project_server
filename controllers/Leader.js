const express = require("express");
const router = express.Router();

const Leader = require("../models/Leader");



async function addUserToBoard(req, res){
  try{
    const response = await Leader.addUserToBoard(req.body.username)
    res.status(200).json({msg: "User added"})
  }catch(err){
    res.status(400).json({err})
  }
}


async function updateScore(req, res) {
  try{
      const username = req.body.username
      const correct = req.body.correct
      const total = req.body.total

      console.log('username')
      console.log(username)

      const user = await Leader.updateUserScore(username, correct, total)

      console.log('broke before here')
      console.log(user)

      res.status(200).json(user)
  } catch (err) {
      res.status(422).json({err})
  }
}

async function leaderboard(req, res) {
  try{
      const topTen = await Leader.leaderboard
      res.status(200).json(topTen)
  } catch (err) {
      res.status(404).json({err})
  }
}

async function removeUser(req, res){
  try{
      const response = await Leader.destroy(req.body.username)
      res.status(200).json(response)
  }catch(err){
    res.status(404).json({err})
  }
}


module.exports = { removeUser, addUserToBoard, updateScore, leaderboard }

