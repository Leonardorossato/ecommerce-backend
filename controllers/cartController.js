const Cart = require('../models/Cart');

class CartController{
    
    static createCart =async (req, res) => {
        const newCart = new Product(req.body)
    
        try {
            const saveCart = await newCart.save()
            res.status(200).json(saveCart)
        }catch (err) {
            res.status(500).json(err)
        }
    }
    
    static updatedCart =  async (req, res) => {
        try {
            const updateCart = await Cart.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },{new: true})
            res.status(200).json(updateCart)
        }catch (err) {
            res.status(500).json(err)
        }
    }
    
    static deletedProductsInCart = async (req, res) => {
        try {
            await Cart.findByIdAndRemove(req.params.id)
            res.status(200).json(updateCart)
        }catch (err) {
            res.status(500).json(err)
        }
    }
    
    static getAllProductsInCart = async (req, res) => {
        try {
            const carts = await Cart.find()
            res.status(200).json(carts) 
        }catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = CartController