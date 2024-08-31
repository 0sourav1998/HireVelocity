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
        required : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    applications : [{
        type : String ,
        required : true
    }]
},{timestamps : true})

module.exports = mongoose.model("Job",jobSchema)