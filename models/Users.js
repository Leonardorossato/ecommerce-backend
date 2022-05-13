const {DataTypes, Model} = require('sequelize')

class Users extends Model {}

Users.init({
    id:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
    }
},{
    sequelize,
    modelName: 'users',
    timestamp: false
})

module.exports = Users