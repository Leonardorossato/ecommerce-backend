const Order = require('../models/Order');

class OrderController{
    
    static createOrder = async (req, res) => {
        const newOrder = new Order(req.body)
    
        try {
            const saverOrder = await newOrder.save()
            res.status(200).json(saverOrder)
        }catch (err) {
            res.status(500).json(err)
        }
    }
    
    static updatedOrder = async (req, res) => {
        try {
            const updateOrder = await Order.findByIdAndUpdate(req.params.id)
            res.status(200).json(updateOrder)
        }catch (err) {
            res.status(500).json(err)
        }
    }
    
    static deletedOrder = async (req, res) => {
        try {
            await Order.findByIdAndDelete(req.params.id)
            res.status(200).json('Order  has been removed')
        }catch (err) {
            res.status(500).json(err)
        }
    }
    
    static getOrderById = async (req, res) => {
        try {
            const orders = await Order.find({userId: req.params.id})
            res.status(200).json(orders) 
        }catch (err) {
            res.status(500).json(err)
        }
    }
    
    static getAllOrders = async (req, res) => {
        try {
            const orders = await Order.find()
            res.status(200).json(orders) 
        }catch (err) {
            res.status(500).json(err)
        }
    }
    
    
    
    static getAllOrdersIncome = async (req, res) => {
        const date = new Date();
        const lastMonth = new Date(date.setDate(date.getMonth()) -1)
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));
    
        try {
            const income = await Order.aggregate([
                {$match: {createdAt:{$gte: previousMonth}}},
                {
                    $project: {$month: "$createdAt"},
                    sales: "$amount"
                },
                {
                    $group: {
                        id: "$month",
                        total: {$sum:"$sales"}
                    }
                }
            ])
            res.status(200).json(income)
        }catch (err) {
            res.status(500).json(err)
        }
    }
}


module.exports = OrderController