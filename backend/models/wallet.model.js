const mongoose = require('mongoose')
const Schema =  mongoose.Schema


const walletSchema = Schema({
    emailaddress: {type:String},
    username: {type:String},
    companyname: {type:String},
    passwordHash:{type:String},
    amount:{type:Number},
    creationDate:{type:Date}
})


const Wallet = mongoose.model('Wallet',walletSchema)

module.exports = Wallet