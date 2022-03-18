const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./auth')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.all('/api/*', auth);


const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("mongoDb connected succesfully")
})

const walletRouter = require('./routes/wallet')
app.use('/api/wallet', walletRouter)

const authRouter = require('./routes/auth')
app.use('/auth',authRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});