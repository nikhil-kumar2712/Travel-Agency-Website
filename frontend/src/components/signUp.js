import { useState } from "react";

const SignUp = ({ onClose }) => {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agree, setAgree] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    if (agree !== "Yes") {
      alert("⚠️ You must agree to the Terms & Conditions to sign up.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uname, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Account created successfully!");
        onClose();
      } else {
        alert(`❌ ${data.message}`);
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
          <h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>Sign Up</h1>
          <p style={{ textAlign: "center" }}>Please fill in this form to create an account.</p>
          <hr />

          <label><b>Username</b></label>
          <input 
            type="text" 
            placeholder="Enter Username" 
            required 
            value={uname} 
            onChange={(e) => setUname(e.target.value)} 
          />
          
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

          <label><b>Repeat Password</b></label>
          <input 
            type="password" 
            placeholder="Repeat Password" 
            required 
            value={repeatPassword} 
            onChange={(e) => setRepeatPassword(e.target.value)} 
          />

          <p>
            <a href="#" style={{ color: "dodgerblue", textDecoration: "none" }}>
              Terms & Conditions
            </a>.
          </p>
          <br />

          <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Do you agree??
          <input 
            type="radio" 
            id="yes" 
            name="agree" 
            value="Yes" 
            checked={agree === "Yes"} 
            onChange={(e) => setAgree(e.target.value)} 
          />
          <label htmlFor="yes">Yes</label>
          <input 
            type="radio" 
            id="no" 
            name="agree" 
            value="No" 
            checked={agree === "No"} 
            onChange={(e) => setAgree(e.target.value)} 
          />
          <label htmlFor="no">No</label>
          </p>
          <br />

          <div className="clearfix">
            <button type="submit" className="signup">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
