const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name : {
        type : String
    },
    description : {
        type : String  
    },
    location : {
        type: String 
    },
    website : {
        type : String
    },
    logo : {
        type : String 
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required:true
    }
},{timestamps : true})

module.exports = mongoose.model("Company",companySchema)