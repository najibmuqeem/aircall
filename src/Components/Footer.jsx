import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-activity footer-selected">
        <BsFillTelephoneFill />
      </div>
      <div className="footer-user">
        <FaUserAlt />
      </div>
    </div>
  );
};

export default Footer;
