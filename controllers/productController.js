
class ProductController{
    static createProduct = async (req, res) => {
        const newProduct = new Product(req.body)
    
        try {
            const savedProduct = await newProduct.save()
            res.status(200).json(savedProduct)
        }catch (err) {
            res.status(500).json(err)
        }
    }
    
    static updatedProduct= async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },{new: true})
            res.status(200).json(updatedProduct)
        }catch (err) {
            res.status(500).json(err)
        }
    }
    
    static deleteProduct= async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json('Product deleted successfully')
        }catch (err) {
            res.status(500).json(err)
        }
    }
    
    static getProductById =async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        }catch (err) {
            res.status(500).json(err)
        }
    }

}

module.exports = ProductController