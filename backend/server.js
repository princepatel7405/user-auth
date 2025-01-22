const express=require("express")
const cors=require("cors")
const connection = require("./db")
const userRouter = require("./modules/user/user.routes")
require("dotenv").config()
const app=express()
app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/",userRouter)

app.listen(process.env.PORT,async()=>{
    console.log(`server is running on ${process.env.PORT}`);
    try {
        await connection
        console.log("Database Connected");
        
    } catch (error) {
        console.log(error);
        
    }
})

