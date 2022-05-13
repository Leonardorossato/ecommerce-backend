const Sequelize = require('sequelize')
const sequelize = new Sequelize('ecommerce','root', '123456',{
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Connection with Mysql was successfully.')
} catch (error) {
    console.error(error)
}

module.exports = sequelize