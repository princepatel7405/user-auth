const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String
    }
},{
    versionKey:false,
    timestamps:true
})

const User=new mongoose.model("User",userSchema)
module.exports=User