const mongoose = require('mongoose')
const Schema =  mongoose.Schema


const transactionsSchema = Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
    transactionType:{type:String},
    sender: {type:String},
    receiver: {type:String},
    amountSent:{type:String},
    creationDate:{type:Date}
})


const Transactions = mongoose.model('Transactions',transactionsSchema)

module.exports = Transactions
