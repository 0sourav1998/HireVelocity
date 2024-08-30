const express = require("express");
const app = express() ;
const cookieParser = require("cookie-parser") ;
const cors = require("cors") ;
require("dotenv").config();
const connectToMongo = require("./config/database")
const PORT = process.env.PORT || 8080 ;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

connectToMongo();

app.use(cors({
    origin : "*",
    credentials : true 
}))

app.get("/",(req,res)=>{
    return res.send("Comming From Backend")
})

app.listen(PORT,()=>{
    console.log(`App is listening to PORT ${PORT}`)
})