const User = require('../models/User')
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SEC = process.env.JWT_SEC
const PASS_SEC = process.env.PASS_SEC

class AuthController{
    static register = async(req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJs.AES.encrypt(req.body.password, PASS_SEC).toString(),
        });
        try {
            const savedUser = await newUser.save();
            res.status(201).json(savedUser)
        }catch (err) {
            res.status(500).json(err)
        }
    
    }
    static login = async(req, res) => {
        try {
            const user = await User.findOne({username: req.body.username});
            !user && res.status(401).json('Credentials Invalids')
    
            const hasPassword = CryptoJs.AES.decrypt(user.password,PASS_SEC)
            const OriginalPassword = hasPassword.toString(CryptoJs.enc.Utf8) 
            
            const accessToken = jwt.sign({
                id: user.id, isAdmin: user.isAdmin
            }, JWT_SEC, {expiresIn: '3d'})
    
            OriginalPassword !== req.body.password && res.status(401).json('Password doesnt match!')
    
            res.status(200).json({message: 'Ok', accessToken})
        }catch (err) {
            res.status(500).json({err : err.message})
        }
    }
}

module.exports = AuthController