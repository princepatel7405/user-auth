const express=require("express")
const userRouter=express.Router()
const userController=require("./userController")
userRouter.post("/register/customer",userController.registerCustomer)
