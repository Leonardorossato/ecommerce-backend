const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SEC = process.env.JWT_SEC

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token

    if(authHeader){
        jwt.verify(token, JWT_SEC, (err, user) => {
            if(err) res.status(403).json('Token is not valid!', err)    
            req.user = user
            next();
        })
    }else{
        return res.status(401).json('No authenticated')
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json('You not allowed to access that!')
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json('You not allowed to access that!')
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}