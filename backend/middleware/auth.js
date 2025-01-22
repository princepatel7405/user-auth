const crypto = require("crypto");
const nodemailer = require("nodemailer");
let store = new Map();

// generates random integet of 6 digits
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};
// transporter for sending mail
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const emailVerification = async (req, res, next) => {
  let { email } = req.body;
    console.log(req.body,"body");
    
  try {
    if (req.body.otp) {
      req.otp = store.get(email);
      next();
    } else {
      if (!email)
        return res.status(400).send({
          message: "Please  Fill Email",
        });
      store.set(email, generateOtp());
      console.log(store, "auth");

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Verify your email",
        html: `
                <div style="background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; text-align: center; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333;">Verification Code</h2>
                <div style="border-top: 2px solid #eee; margin: 10px 0;"></div>
                    <p style="font-size: 16px; color: #555;">
                      <strong>OTP:</strong> ${store.get(email)} <br>
                    </p>
                    <div style="border-top: 2px solid #eee; margin: 20px 0;"></div>
                </div>
                </div>
                `,
      };
      await transporter.sendMail(mailOptions);
      req.otp = store.get(email);

      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { emailVerification, store };
