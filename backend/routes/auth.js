const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Wallet = require('../models/wallet.model')


function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

// login
router.route("/login").post((req, res) => {
    const { emailaddress, passwordHash } = req.body;

    if (!emailaddress  && !passwordHash){
      res.status(500).json({msg:"pls ensure fields are not empty "})
      return
    }

    if (validateEmail(emailaddress) === false){
      res.status(500).json({msg:"enter correct email "})
      return
    }

    Wallet.findOne({emailaddress})
      .then(user => {
        if (!user){
          res.status(500).json({msg:"no user with that username"})
          return
        }
         else if(!bcrypt.compareSync(passwordHash, user.passwordHash)) {
           res.status(500).json({msg: "Invalid Password"});
           return
        }

        jwt.sign({
          emailaddress: user.emailaddress
        }, 'secret', (err, token) => {
          if(err) throw err;
          res.status(200).json({
            token,
            status:true,
            user: {
              emailaddress: user.emailaddress,
            }
          });
        });
      })
      .catch(err => {
        res.status(500).json({msg:"that user does not exist"})
      });
  });


  router.route("/signup").post((req,res)=> {
    const {companyname,emailaddress,username,passwordHash} = req.body
    if (!companyname && !emailaddress && !username && !passwordHash){
      res.status(500).json({msg:"pls ensure fields are not empty"})
      return
    }

     if (validateEmail(emailaddress) === false){
       res.status(500).json("enter correct email ")
       return;
     }

     let amount = 0
     let creationDate = Date.now()

    let newWallet = new Wallet({
      emailaddress,
      username,
      companyname,
      passwordHash: bcrypt.hashSync(passwordHash, 10),
      amount,
      creationDate
    })

    newWallet
    .save()
    .then(wallet => {
      console.log(wallet)
      jwt.sign({
        emailaddress: newWallet.emailaddress
      }, 'secret', (err, token) => {
        if(err) throw err;
        res.send({
          token,
          status:true,
          wallet: {
            emailaddress: wallet.emailaddress
          }
        })
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({msg:"something weird is going on"})
    })
  })

    module.exports = router