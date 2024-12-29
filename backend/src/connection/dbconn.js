const mongoose = require("mongoose");

//Connecting the Database s

exports.dbconn = () => {
    try{
        const conn = mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB is connected");
    }catch(e){
        console.log("mongoDB is not connected");
    }
};



