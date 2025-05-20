import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/Logo AtchoYoyo VF-04.png'
import instagram_icon from "../Assets/instagram_icon.png"
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>AVO-HO</p>
      </div>
      <ul className="footer-links">
        <li>Compagnie</li>
        <li>Produits</li>
        <li>Services</li>
        <li>A propos</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icon-container">
            <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icon-container">
            <img src={pintester_icon} alt="" />
        </div>
        <div className="footer-icon-container">
            <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @2025 -All Right Reserve.</p>
      </div>
    </div>
  )
}

export default Footer
