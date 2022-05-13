const stripe = require('stripe')(STRIPE_KEY)
require('dotenv').config()
const STRIPE_KEY = process.env.STRIPE_KEY

class StripeController{
    static createPaymentMethod = async(req, res) => {
        stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        }, (stripeErr, stripeRes)=>{
            if(stripeErr){
                res.status(500).json(stripeErr)
            }else{
                res.status(200).json(stripeRes)
            }
        })
    }
}

module.exports = StripeController