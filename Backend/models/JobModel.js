const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String ,
        required : true 
    },
    salary : {
        type: Number ,
        required : true
    },
    location : {
        type : String ,
        required : true 
    },
    experiance : {
        type : Number ,
        required : true
    },
    position : {
        type : Number ,
        required : true 
    },
    requirements : [{
        type : String ,
        required : true
    }] ,
    jobType : {
        type : String ,
        required : true
    },
    company : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Company",
        required : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    applications : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Applications"
    }]
},{timestamps : true})

module.exports = mongoose.model("Job",jobSchema)