const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("DB Connected Successfully"))
    .catch((error) =>
      console.log(
        "Something went wrong while connecting with DB",
        error.message
      )
    );
};

module.exports = connectToMongo
