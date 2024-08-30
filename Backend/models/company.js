const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String  
    },
    location : {
        type: Number 
    },
    website : {
        type : String
    },
    logo : {
        type : String 
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" 
    }
},{timestamps : true})

module.exports = mongoose.model("Company",companySchema)