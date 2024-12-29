//Installing dependencies
const express = require('express')
const dotenv = require('dotenv')
const { dbconn } = require('./src/connection/dbconn')
const AuthRoutes = require('./src/routes/AuthRoutes.js')




//Configuring dependencies
const app = express()
dotenv.config()
app.use(express.json())

//Initialling Variables 
const port = process.env.PORT;

//Establishing Database Connection
dbconn();


//Sample Endpoint
app.get("/" , (req,res) => {
    res.json("This page is alive")
})


//Establishing Routes
app.use('/auth',AuthRoutes)


//Server Running
app.listen(port, (req, res) => {
    console.log(`server successfully run on ${port}`);
});
  
