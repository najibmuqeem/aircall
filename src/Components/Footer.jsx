import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaRecordVinyl, FaUserAlt } from "react-icons/fa";
import { IoIosKeypad, IoIosSettings } from "react-icons/io";

const Footer = ({ setShowModal }) => {
  const icons = [
    <FaUserAlt />,
    <IoIosKeypad />,
    <IoIosSettings />,
    <FaRecordVinyl />,
  ];
  return (
    <div className="footer">
      <div className="footer-item footer-selected">
        <BsFillTelephoneFill />
      </div>
      {icons.map((icon, index) => (
        <React.Fragment key={index}>
          <div
            className="footer-item"
            onClick={() => {
              setShowModal({ display: true, message: "Coming soon!" });
              setTimeout(() => {
                setShowModal({ display: false, message: "Coming soon!" });
              }, 3000);
            }}
          >
            {icon}
          </div>
        </React.Fragment>
      ))}
      {/* <div
        className="footer-item"
        onClick={() => setShowModal({ display: true, message: "Coming soon!" })}
      >
        <FaUserAlt />
      </div>
      <div
        className="footer-item"
        onClick={() => setShowModal({ display: true, message: "Coming soon!" })}
      >
        <IoIosKeypad />
      </div>
      <div
        className="footer-item"
        onClick={() => setShowModal({ display: true, message: "Coming soon!" })}
      >
        <IoIosSettings />
      </div>
      <div
        className="footer-item"
        onClick={() => setShowModal({ display: true, message: "Coming soon!" })}
      >
        <FaRecordVinyl />
      </div> */}
    </div>
  );
};

export default Footer;
