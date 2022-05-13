const Users = require('../models/Users');
require('dotenv').config()
const PASS_SEC = process.env.PASS_SEC

class AdminController{
    
    static updateUser  = async(req, res)  => {
        if(req.body.password){
           req.body.password = CryptoJS.AES.encrypt(req.body.password,PASS_SEC).toString();
        }
        try {
            const updateUser = await Users.findByPk(req.params.id, {
                $set: req.body
            }, {new: true});
            res.status(200).json(updateUser);
        }catch(err) {
            res.status(500).json(err);
        }
    }
    
    static deleteUser = async(req, res) => {
        try{
            await Users.destroy(req.params.id)
            res.status(200).json("User has been deleted");
        }catch(err) {
            res.status(500).json(err);
        }
    }
    
    static getUserById = async (req, res) => {
        try{
            const user =  await Users.findByPk(req.params.id)
            const {password, ...others} = user._doc
    
            res.status(200).json(others);
        }catch(err) {
            res.status(500).json(err);
        }
    }
    
    /*router.get('/',verifyTokenAndAdmin ,async (req, res) => {
        const query = req.query.new;
        try{
            const users = query ? await User.find().sort({_id: 1}).limit(1) : await User.find()
            res.status(200).json(users);
        }catch(err) {
            res.status(500).json(err);
        }
    })
    */
    
    static getUserForStats = async (req, res) => {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() -1));
    
        try {
            const date = await Users.aggregate([
                {$match: {createdAt : {$gte: lastYear}}},
                {
                    $project : {
                        month :  {$month: "createdAt"}
                    }
                },
                {
                    $group : {
                        _id: "$month",
                        total: {$sum: 1}
                    }
                }
            ])
            res.status(200).json(date)
        }catch(err) {
            res.status(400).json(err);
        }
    }
    
}

module.exports = AdminController;