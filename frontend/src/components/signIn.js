import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // ✅ Store user info if needed
        localStorage.setItem("user", JSON.stringify(data.user)); 
        onClose(); // close modal if you want
        navigate("/homeaftersignin"); // ✅ redirect to page
      } else {
        alert(`❌ ${data.error || data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error connecting to server.");
    }
  };


  return (
    <div className="modal">
      <span onClick={onClose} className="close">x</span>
      <form className="modal-content" onSubmit={handleSubmit}>
        <div className="contain">
          <h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>Sign In</h1>
          <hr />
          
          <label><b>Email</b></label>
          <input 
            type="text" 
            placeholder="Enter Email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />

          <label><b>Password</b></label>
          <input 
            type="password" 
            placeholder="Enter Password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <label>
            <input type="checkbox" defaultChecked name="remember" style={{ marginBottom: "15px" }} /> Remember me
          </label>

          <div className="clearfix">
            <button type="submit" className="signup">Sign In</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
