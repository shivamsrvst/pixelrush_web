import React from 'react'
import './header.css'
import logo from "../assets/Pixelrush_logo.png";

function Header() {
  return (
    <div className="nav">
        <div className="logo-container">
            <img src={logo} alt="Website Logo" className="logo" /> {/* Display your logo */}
        </div>
    </div>
  )
  
}

export default Header