const express = require("express");
const app = express() ;
const cookieParser = require("cookie-parser") ;
const cors = require("cors") ;
require("dotenv").config();
const connectToMongo = require("./config/database");
const userRouter = require("./routes/UserRoute")
const companyRoute = require("./routes/companyRoute")
const jobRoute = require("./routes/jobRoute")
const applicationRoute = require("./routes/applicationRoute")
const PORT = process.env.PORT || 8080 ;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

connectToMongo();

app.use(cors({
    origin : "*",
    credentials : true 
}))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

app.get("/",(req,res)=>{
    return res.send("Comming From Backend")
})

app.listen(PORT,()=>{
    console.log(`App is listening to PORT ${PORT}`)
})