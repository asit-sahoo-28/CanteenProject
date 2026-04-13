


// import React from "react";
// import "./Footer.css";
// import { assets } from "../../assets/assets";

// const Footer = () => {
//   return (
//     <div className="footer" id="footer">
//       <div className="footer-content">

//         {/* LEFT */}
//         <div className="footer-content-left">
//           <p>
//             Smart canteen management made easy. Order fresh meals, skip long
//             queues, and enjoy fast, reliable service every day.
//           </p>

//           <div className="footer-social-icons">
//             <img src={assets.facebook_icon} alt="Facebook" />
//             <img src={assets.twitter_icon} alt="Twitter" />
//             <img src={assets.linkedin_icon} alt="LinkedIn" />
//           </div>
//         </div>

//         {/* CENTER */}
//         <div className="footer-content-center">
//           <h2>QUICK LINKS</h2>
//           <ul>
//             <li>Home</li>
//             <li>Menu</li>
//             <li>Orders</li>
//             <li>About Us</li>
//             <li>Privacy Policy</li>
//           </ul>
//         </div>

//         {/* RIGHT */}
//         <div className="footer-content-right">
//           <h2>CONTACT US</h2>
//           <ul>
//             <li>📞 +91 78490 47603</li>
//             <li>📧 mycanteen.in@gmail.com</li>
//             <li>📍 Campus Canteen, India</li>
//           </ul>
//         </div>
//       </div>

//       {/* BOTTOM COPYRIGHT */}
//       <div className="footer-bottom">
//         © 2025 Canteen Management System. All Rights Reserved. | Developed by Asit Sahoo
//       </div>
//     </div>
//   );
// };

// export default Footer;











import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer" id="footer">
      <div className="footer-content">

        {/* LEFT */}
        <div className="footer-content-left">
          <h2 className="footer-logo">🍽️ My Canteen</h2>

          <p>
            Smart canteen management made easy. Order fresh meals, skip long
            queues, and enjoy fast, reliable service every day.
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" title="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" title="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" title="LinkedIn" />
          </div>
        </div>

        {/* CENTER */}
        <div className="footer-content-center">
          <h2>Quick Links</h2>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/")}>Menu</li>
            <li onClick={() => navigate("/")}>Orders</li>
            <li onClick={() => navigate("/")}>About Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-content-right">
          <h2>Contact Us</h2>
          <ul>
            <li>📞 +91 78490 47603</li>
            <li>📧 mycanteen.in@gmail.com</li>
            <li>📍 Campus Canteen, India</li>
          </ul>
            
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © 2026 Canteen Management System. All Rights Reserved. <br />
        <p>
    Developed with ❤️ by <strong>Asit Sahoo</strong> & Team Canteen Tech
  </p>
      </div>
    </footer>
  );
};

export default Footer;