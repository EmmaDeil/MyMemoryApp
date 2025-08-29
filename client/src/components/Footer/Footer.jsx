import React from 'react'
import './style.css'

const Footer = () => {
  return (
    <div>
      <footer className='footer'>
        <div className="footer-container">
          <p className='footer-text'>&copy; {new Date().getFullYear()} Memories. All rights reserved.</p>

          <div className="footer-links">
            <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms-of-service" className="footer-link">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;