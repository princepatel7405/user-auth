const express=require("express")
const cors=require("cors")
const connection = require("./db")
require("dotenv").config()
const app=express()
app.use(cors({origin:"*"}))
app.use(express.json())

app.listen(process.env.PORT,async()=>{
    console.log(`server is running on ${process.env.PORT}`);
    try {
        await connection
        console.log("Database Connected");
        
    } catch (error) {
        console.log(error);
        
    }
})

