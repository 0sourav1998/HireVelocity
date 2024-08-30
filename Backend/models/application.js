const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    job : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Company"
    },
    applicant : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    status : {
        type : String ,
        enum : ["pending","accepted","rejected"]
    }
},{timestamps : true});

module.exports = mongoose.model("Applications",applicationSchema)