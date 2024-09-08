const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    job : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Job"
    },
    applicant : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    status : {
        type : String ,
        enum : ["pending","Accept","Reject"] ,
        default : "pending"
    }
},{timestamps : true});

module.exports = mongoose.model("Applications",applicationSchema)