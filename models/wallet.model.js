const mongoose = require('mongoose')
const Schema =  mongoose.Schema


const walletSchema = Schema({
    companyname: {type:String,unique:true},
    emailaddress: {type:String,unique:true},
    password:{type:String},
    amount:{type:Number},
    creationDate:{type:Date}
})


const Wallet = mongoose.model('Wallet',walletSchema)

module.exports = Wallet