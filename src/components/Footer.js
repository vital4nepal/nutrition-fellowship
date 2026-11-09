import React from "react";
import "./Footer.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-above">
          <div className="footer-description">
            <img src="/Nutrition_logo33.png" className="footer-logo" alt="Company Logo" />
            <p>
              Nutrition Fellowship for Nepal aims to unite three generations of stakeholders 
              from Nepal and around the world.
            </p>
          </div>

          <div className="footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="https://nutrition-dashboard-vision.vercel.app/">Nutrition Dashboard</a></li>
              <li><a href="http://www.nnfsp.gov.np/">Nepal Nutrition and Food Security Portal</a></li>
              {/* <li><a href="#events">Events</a></li>
              <li><a href="#special-initiatives">Special Initiatives</a></li>
              <li><a href="#place-your-thoughts">Place Your Thoughts</a></li>
              <li><a href="#contact-us">Contact Us</a></li> */}
            </ul>
          </div>

          <div className="footer-social">
            <h4>Get in Touch</h4>
            <div className="social-icons">
              <a className="facebook" href="https://www.facebook.com/profile.php?id=61572729923914" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="instagram" href="https://www.instagram.com/nutfellowship/?hl=en" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="linkedin" href="https://x.com/nutfellowship" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <hr />

        <div className="footer-below">
          <p className="email">
            If you have any queries, feel free to email us at:-
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nutfellowship@gmail.com" target="_blank" rel="noopener noreferrer">
              nutfellowship@gmail.com
            </a>
          </p>
          <p>
            Copyright © 2024 All Rights Reserved{" "}
            <span>
              <a href="#navbar">NutritionFellowshipForNepal</a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;