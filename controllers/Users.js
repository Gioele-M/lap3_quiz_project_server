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













module.exports = { indexUsers }
///////////////////////////////////






// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.all;
    res.json({ users });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.get("/at/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ user });
    res.status(200);
  } catch (err) {
    res.status(500).json({ err });
  }
});


// LEADERBOARD
// router.get("/leaderboard", async (req, res) => {
//   try {
//     const users = await User.leaderboard;
//     res.json({ users });
//     res.status(200);
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// });



// Create User
router.post("/", async (req, res) => {
  try {
    const user = await User.create(
      req.body.username,
      req.body.email,
      req.body.password
    );
    res.json(user);
    res.status(201);
  } catch (err) {
    res.status(404).json({ err });
  }
});

//Update User
// router.patch("/:id", async (req, res) => {
//   try {
//     const updatedUser = await User.update(req.body.username, req.body.score);
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(500).json({ err });
//   }
// });

//Delete User 
                                                    // Need the destroy() function
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await user.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

// module.exports = router;



// const express = require('express');
// const router = express.Router();

// const bcrypt = require('bcryptjs');

// const User = require('../models/user');

// router.post('/register', async (req, res) => {
//     try {
//         const salt = await bcrypt.genSalt();
//         const hashed = await bcrypt.hash(req.body.password, salt)
//         await User.create({...req.body, password: hashed})
//         res.status(201).json({msg: 'User created'})
//     } catch (err) {
//         res.status(500).json({err});
//     }
// })

// router.post('/login', async (req, res) => {
//     try {
//         const user = await User.findByEmail(req.body.email)
//         if(!user){ throw new Error('No user with this email') }
//         const authed = bcrypt.compare(req.body.password, user.passwordDigest)
//         if (!!authed){
//             res.status(200).json({ user: user.username })
//         } else {
//             throw new Error('User could not be authenticated')  
//         }
//     } catch (err) {
//         res.status(401).json({ err });
//     }
// })

// module.exports = router
