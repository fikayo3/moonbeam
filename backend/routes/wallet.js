const Wallet = require('../models/wallet.model')
const Transactions = require('../models/transactions.model')
const Router = require('express').Router();

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

Router.route('/updateWallet/').post((req,res)=>{
const {newEmail,newCompanyname} = req.body 

     if(!newEmail && !newCompanyname){
         res.status(500).json({msg:"fields cannot be empty"})
         return
     }

     if(validateEmail(newEmail) === false){
         res.status(500).json({msg:"email not valid"})
         return
     }

    Wallet.findOne({emailaddress:req.emailaddress}).then(user => {
        console.log(user)
        user.emailaddress = newEmail
            user.companyname = newCompanyname
            user.save()
            .then(() => res.json({msg:"wallet details updated succesfully"}))
    }).catch(err  => {
        console.log(err)
    })
})

Router.route('/deposit').post((req,res)=> {
    const {newAmount} = req.body 

    if (newAmount === ""){
        res.status(500).json({msg:"pls ensure fields are not empty "})
        return
    }

     if (newAmount <= 0 ){
        res.status(500).json({msg:"enter a valid number"})
        return
    }

    Wallet.findOne({emailaddress:req.emailaddress}).then(user => {
            user.amount += newAmount
            user.save()
            .then(()=> res.json({msg:"deposited succesfully "}))
    }).catch(()=> res.status(500).json({msg:"that user does not exist"}) )
})

Router.route('/dashboard').get((req, res) => {
    Wallet.findOne({emailaddress:req.emailaddress}).then(user => {
            res.json(user)
  }).catch(()=> res.status(500).json({msg:"that user does not exist"}) )
})

Router.route('/transfer').post((req,res)=> {
    const {receiverMail,transferAmount} = req.body

    if (!receiverMail  && !transferAmount ){
        res.status(500).json({msg:"pls ensure fields are not empty "})
        return
      }

      if (transferAmount <= 0){
        res.status(500).json({msg:"invalid number"})
        return
    }

    if (validateEmail(receiverMail) === false){
        res.status(500).json({msg:"email not valid "})
        return
    }

    let transactionDate = Date.now()
    Wallet.findOne({emailaddress:req.emailaddress}).then(user => {
            Wallet.findById({_id:user._id}).then(user => {
                if(user.amount > transferAmount){
                    user.amount -= transferAmount
                    console.log(user)
                    user.save()
                    const senderTransaction = new Transactions({
                        userId:user._id,
                        transactionType:"Debit",
                        sender:req.emailaddress,
                        receiver:receiverMail,
                        amountSent:transferAmount,
                        creationDate: transactionDate
                    })
                    senderTransaction.save()
                    .then( Wallet.findOne({emailaddress:receiverMail}).then(receiver => {
                        if (!receiver){
                            res.status(500).json({msg:"not sure that user exists on our space"})
                            return
                        }
                        receiver.amount += transferAmount
                        receiver.save()
                        console.log(receiver)
                        const receiverTransaction = new Transactions({
                            userId:receiver._id,
                            transactionType:"Credit",
                            sender:req.emailaddress,
                            receiver:receiverMail,
                            amountSent:transferAmount,
                            creationDate: transactionDate
                        })
                        receiverTransaction.save()
                        res.status(500).json({msg:"money succesfully transferred"})
                       }))
                   
                         .catch((err)=> res.status(400).json("error" + err))
                } 
                else{
                    res.json({msg:"insufficient balance "})
                }
            }).catch(()=> res.status(500).json({msg:"user dosent exist"}))
    }).catch(()=> res.status(500).json({msg:"that user does not exist"}) )
})

Router.route('/userTransactions').get((req,res)=> {
    Wallet.findOne({emailaddress:req.emailaddress}).then(user => {
        Transactions.find({userId:user._id}).then(transaction => {
            res.json(transaction)
        }).catch((err)=> res.json(err))
    }).catch(()=> res.status(500).json({msg:"user dosent exist"}))
})

Router.route('/adminTransactions').get((req,res)=> {
    Transactions.find()
    .then(item => {
        res.json(item)
    })
    .catch((err)=>res.json(err) )
})

module.exports = Router