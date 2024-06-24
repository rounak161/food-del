import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className="footer" id='contact-us'>
         <div className="footer-content">
            <div className="footer-content-left">
               <img src={assets.logo} alt="" />
               <p>Discover the best food & drinks in your area.</p>
                <div className="footer-social-icons">
                  <img src={assets.facebook_icon} alt="" />
                  <img src={assets.twitter_icon} alt="" />
                  <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                 <h2>COMPANY</h2>
                 <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                 </ul>
            </div>
            <div className="footer-content-right">
             <h2>GET IN TOUCH</h2>
             <ul>
                <li>+1-212-456-7898</li>
                <li>contact@tomato.com</li>
             </ul>
            </div>
         </div>
         <hr/>
         <p className='footer-copyright'>Copyright 2024 @ Tomato.com-All Rights Reserved.</p>
    </div>
  )
}

export default Footer