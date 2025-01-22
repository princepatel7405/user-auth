const express=require("express")
const userRouter=express.Router()
const userController=require("./userController")
const {emailVerification} = require("../../middleware/auth")
userRouter.post("/register/customer",emailVerification,userController.registerCustomer)
userRouter.post("/emailverify",emailVerification,userController.verify)
userRouter.post("/register/admin",emailVerification,userController.registerAdmin)
userRouter.post("/admin/login",userController.adminLogin)
module.exports=userRouter