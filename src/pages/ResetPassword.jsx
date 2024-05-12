import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './resetPassword.css'; 
import axios from "axios";
import { backend_url } from "../../constant";

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); // Initially assume passwords match
  const [passwordValid, setPasswordValid] = useState(false); // Initially assume password is not valid
  const [formFilled, setFormFilled] = useState(false); // Initially assume form is not filled
  const [responseMessage, setResponseMessage] = useState('');
  const {token}=useParams(); 
  const navigate = useNavigate(); 
  useEffect(() => {
    // Check if passwords match
    if (confirmPassword !== '' && password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }

    // Check if password meets complexity requirements
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{8,}$/;
    setPasswordValid(passwordRegex.test(password));

    // Check if both password and confirm password are non-empty
    setFormFilled(password !== '' && confirmPassword !== '');
  }, [password, confirmPassword]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const renderBullet = (condition) => {
    return condition ? '✓' : '●';
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
        try {
      const response = await axios.post(`${backend_url}/api/reset-password/`, {
        resetToken: token,
        newPassword: password
      });

      console.log(response.data); // Log the response
      // Optionally, you can redirect the user or display a success message
      if (response.status === 200) {
        navigate('/reset-password/reset-success', { replace: true });
      } 
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 400) {
          setResponseMessage('Token expired or invalid. Please request a new reset link.');
        } else {
          setResponseMessage('Something went wrong. Please try again later.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        setResponseMessage('No response received from the server. Please try again later .');
      } else {
        // Something happened in setting up the request that triggered an error
        setResponseMessage('An error occurred while sending the request. Please try again later.');
      }
    }
    
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="password-criteria-container">
            <div className="password-criteria">
            <p>{renderBullet(password.length >= 8)} Password must be at least 8 characters long</p>
            <p>{renderBullet(/[a-z]/.test(password))} Must contain at least one lowercase letter</p>
            <p>{renderBullet(/[A-Z]/.test(password))} Must contain at least one uppercase letter</p>
            <p>{renderBullet(/\d/.test(password))} Must contain at least one numeric digit</p>
            <p>{renderBullet(/[!@#$%^&*()_+}{"':;?/>.<,]/.test(password))} Must contain at least one special character</p>
            </div>
          </div>
          {!passwordValid && <p className="password-invalid-error">Password does not meet the criteria</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!passwordMatch && <p className="password-match-error">Passwords do not match</p>}
        </div>
        <button type="submit" disabled={!passwordMatch || !passwordValid || !formFilled} className={(!passwordMatch || !passwordValid || !formFilled) ? "disabled" : ""}>Reset Password</button>
      </form>
      {responseMessage && 
      
      <h3 className="error-msg">{responseMessage}</h3>
      }
    </div>
  );
}

export default ResetPassword;
