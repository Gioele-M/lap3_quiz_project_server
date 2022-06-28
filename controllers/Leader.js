const express = require("express");
const router = express.Router();

const Leader = require("../models/Leader");




async function updateScore(req, res) {
  try{
      const username = req.body.username
      const percentage = req.body.score
      const user = await Leader.updateUserScore(username, percentage)
      res.status(200).json(user)
  } catch (err) {
      res.status(422).json({err})
  }
}

async function leaderboard(req, res) {
  try{
      const topTen = await Leader.usersTopTen
      res.status(200).json(topTen)
  } catch (err) {
      res.status(404).json({err})
  }
}


module.exports = { updateScore, leaderboard }

