const { store, emailVerification } = require("../../middleware/auth");
const User = require("./userSchema");

exports.registerCustomer = async (req, res) => {
  let { otp, email, first_name, last_name, password } = req.body;

  console.log(req.otp, "otp");

  try {
    if (otp == req.otp) {
      console.log("otp matched");

      let existUser = await User.findOne({ email });
      console.log(existUser,"existUser");
      
      if (existUser)
        return res.status(200).send({ message: "User already exists" });
      let data = await User({
        email: email,
        first_name,
        last_name,
        password,
        role: "Customer",
      });
      store.delete(req.body.email);
      await data.save();
      res.status(200).send({
        message: "Successfully User Saved",
      });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};

exports.verify = async (req, res) => {
  let { email, otp } = req.body;
  console.log(req.otp, "verify");

  res.status(200).send({
    message: "otp Sent",
  });
};

exports.registerAdmin = async (req, res) => {
  let { otp, email, first_name, last_name, password } = req.body;

  console.log(req.otp, "otp");

  try {
    if (otp == req.otp) {
      let existUser = await User.findOne({ email });
      if (existUser)
        return res.status(200).send({ message: "User already exists" });
      let data = await User({
        email: email,
        first_name,
        last_name,
        password,
        role: "Admin",
      });
      store.delete(req.body.email);
      await data.save();
      res.status(200).send({
        message: "Successfully User Saved",
      });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};

exports.adminLogin=async(req,res)=>{
    let {email,password}=req.body
    try {
        let existUser=await User.findOne({email})
        if(existUser.role=="Admin"){
            if(existUser.password==password){
                res.status(200).send({
                    message:"Successfully Logged in"
                })
            }else{
                res.status(200).send({
                    message:"Wrong Cridentials"
                })
            }
        }else{
            return res.status(200).send({
                message:"You are not allowed to login from here"
            })
        }
        
    } catch (error) {
        res.status(400).send({
            messsage:error.message,
            error
        })
    }
}