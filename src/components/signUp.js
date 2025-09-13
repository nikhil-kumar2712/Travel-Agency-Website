import React from "react";

const SignUp = ({ onClose }) => {
  return (
    <div className="modal">
      <span onClick={onClose} className="close">x</span>
      <form className="modal-content">
        <div className="contain">
          <h1 style={{ textAlign: "center", fontSize: "1.5rem" }}>Sign Up</h1>
          <p style={{ textAlign: "center" }}>Please fill in this form to create an account.</p>
          <hr />
          
          <label><b>Email</b></label>
          <input type="text" placeholder="Enter Email" required />

          <label><b>Password</b></label>
          <input type="password" placeholder="Enter Password" required />

          <label><b>Repeat Password</b></label>
          <input type="password" placeholder="Repeat Password" required />

          <p>
            <a href="#" style={{ color: "dodgerblue", textDecoration: "none" }}>
              Terms & Conditions
            </a>.
          </p>
          <br />

          <p>
            Do you agree?? &nbsp;
            <input type="radio" id="yes" name="agree" value="Yes" />
            <label htmlFor="yes">Yes</label>
            <input type="radio" id="no" name="agree" value="No" />
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
