import React, { useEffect, useState } from "react";
import "./CustomerRegister.css";
const CustomerRegister = () => {
  let url = "http://localhost:8080";
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    otp: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (otpSent && !formData.otp) {
      newErrors.otp = "OTP is required for validation";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if(otpSent){
        try {
            console.log("Form data submitted:", formData);
          let data = await fetch(`${url}/register/customer`, {
            method: "POST",
            body: JSON.stringify(formData),
        headers:{
            "Content-Type": "application/json"
        }
          });
          data = await data.json();
          console.log(data,"registered");
          alert(data.message)
        } catch (error) {
          console.log(error);
        }

    }
    else if (validateForm()) {
      try {
        let data = await fetch(`${url}/emailverify`, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        data = await data.json();
        if (data.message === "otp Sent") {
          setOtpSent(true);
          alert(data?.message)
        }
       
      } catch (error) {
        console.log(error);
      }
      
    }
  };
  useEffect(() => {}, [otpSent]);
  return (
    <div>
      <div className="register-form-container">
        <h2>Customer Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            {errors.first_name && (
              <span className="error">{errors.first_name}</span>
            )}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            {errors.last_name && (
              <span className="error">{errors.last_name}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          {otpSent && (
            <div className="form-group">
              <label>OTP</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter OTP"
              />
              {errors.otp && <span className="error">{errors.otp}</span>}
            </div>
          )}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegister;
