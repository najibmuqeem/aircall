import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaRecordVinyl, FaUserAlt } from "react-icons/fa";
import { IoIosKeypad, IoIosSettings } from "react-icons/io";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-item footer-selected">
        <BsFillTelephoneFill />
      </div>
      <div className="footer-item">
        <FaUserAlt />
      </div>
      <div className="footer-item">
        <IoIosKeypad />
      </div>
      <div className="footer-item">
        <IoIosSettings />
      </div>
      <div className="footer-item">
        <FaRecordVinyl />
      </div>
    </div>
  );
};

export default Footer;
