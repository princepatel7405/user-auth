const crypto = require('crypto');
    let store=new Map()

const generateOtp=()=>{
    return crypto.randomInt(100000,999999).toString()
}

const emailVerification=(ree,res,next)=>{
    
}