import React from "react";

const SignIn = ({ onClose }) => {
  return (
    <div className="modal">
      <span onClick={onClose} className="close">x</span>
      <form className="modal-content">
        <div className="contain">
          <h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>Sign In</h1>
          <hr />
          
          <label><b>Email</b></label>
          <input type="text" placeholder="Enter Email" required />

          <label><b>Password</b></label>
          <input type="password" placeholder="Enter Password" required />

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
