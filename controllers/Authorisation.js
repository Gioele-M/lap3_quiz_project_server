const bcrypt = require('bcryptjs');
const User = require('../models/User');

const userModel = require('../models/User')


// check if user exists already
async function registerUser(req, res){
    try{
        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(req.body.password, salt)
        await userModel.create(req.body.username, req.body.email, hashed)
        res.status(201).json({msg: 'User created'})
    }catch(err){
        res.status(500).json({err})
    }
}

async function loginUser(req, res){
    try{
        const user = await User.findByUsername(req.body.username)
        if(!user){
            throw new Error('No user with this username')
        }
        const authoed = bcrypt.compare(req.body.password, user.password)
        if(!authed){
            res.status(200).json({ user: user.username})
        }else{
            throw new Error('User could not be authenticated, check your password again')
        }

    }catch (err){
        res.status(401).json({err})
    }
}



module.exports = { registerUser, loginUser}
