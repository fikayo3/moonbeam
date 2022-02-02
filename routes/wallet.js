
const Wallet = require('../models/wallet.model')
const Transactions = require('../models/transactions.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const Router = require('express').Router();
//
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

// login
  router.route("/login").post((req, res) => {
    const { emailaddress, password } = req.body;

    if (!emailaddress  && !password){
      res.status(500).json({msg:"pls ensure fields are not empty "})
    }

    if (validateEmail(emailaddress) === false){
      res.status(500).json({msg:"enter correct email "})
      return;
    }

    Wallet.findOne({emailaddress})
      .then(user => {
        console.log(user)
        if(!user) {
          res.status(500).json({msg: "No User with that emailaddress: " + emailaddress});
          return;
        } else if(!bcrypt.compareSync(password, user.passwordHash)) {
          res.status(500).json({msg: "Invalid Password"});
        } 
        jwt.sign({
          emailaddress: user.emailaddress
        }, 'secret', (err, token) => {
          if(err) throw err;
          res.send({
            token,
            status:true,
            user: {
              emailaddress: user.emailaddress
            }
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(200).json({msg: `that user does not exist`});
      });
  });

// create wallet
Router.route('/add').post((req,res)=> {
    const {emailaddress,companyname,password} = req.body

        let amount = 0
        let creationDate = Date.now()
    
        if (!companyname && !emailaddress && !password){
            res.status(500).json({msg:"pls ensure fields are not empty "})
          }
    
         if (validateEmail(emailaddress) === false){
             res.status(500).json({msg:"enter correct email "})
             return;
           }

        const newWallet = new Wallet({
            companyname,
            emailaddress,
            password: bcrypt.hashSync(password, 10),
            amount,
            creationDate
        })
        newWallet.save()
        .then(user => {
            ()=> res.json('wallet added'),
            jwt.sign({
                emailaddress: newUser.emailaddress
              }, 'secret', (err, token) => {
                if(err) throw err;
                res.send({
                  token,
                  status:true,
                  user: {
                    emailaddress: user.emailaddress
                  }
                });
              })
          }).catch(err => {
            console.log(err);
            res.status(200).json({msg: `Wallet already exists. Try Loggin In.`});
          });
        }) 

Router.route('/updateWallet/').post((req,res)=>{
const {newCompanyname,newEmail} = req.body   
    Wallet.findOne({emailaddress:req.emailaddress}).then(user => {
        console.log(user)
            user.companyname = newCompanyname
            user.emailaddress = newEmail
            user.save()
            .then(() => res.json("wallet details updated succesfully"))
    }).catch(()=> res.status(500).json({msg:"that user does not exist"}) )
})

Router.route('/deposit').post((req,res)=> {
    const {newAmount} = req.body  
    Wallet.findOne({emailaddress:req.emailaddress}).then(user => {
        console.log(user)
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
                    .then(res.json("monesuccesfully transferred"))

                    // receiver
                    Wallet.findOne({emailaddress:receiverMail}).then(receiver => {
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
                       })
                    .catch((err)=> res.status(400).json("error" + err))
                } 
                else{
                    res.json({msg:"insufficient balance "})
                }
            }).catch(()=> res.status(500).json({msg:"user dosent exist"}))
    }).catch(()=> res.status(500).json({msg:"that user does not exist"}) )
})

// user transactions 
Router.route('/userTransactions').get((req,res)=> {
    Wallet.findOne({emailaddress:req.emailaddress}).then(user => {
        Transactions.find({userId:user._id}).then(transaction => {
            res.json(transaction)
        }).catch((err)=> res.json(err))
    }).catch(()=> res.status(500).json({msg:"user dosent exist"}))
})

// admin transactions
// database superuser automatically has access to all company transactons
Router.route('/adminTransactions').get((req,res)=> {
    Transactions.find()
    .then(item => {
        res.json(item)
    })
    .catch((err)=>res.json(err) )
})

module.exports = Router