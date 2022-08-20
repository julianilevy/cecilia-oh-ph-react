import React from "react";
import styles from "./Footer.module.css";
import LogoInstagram from "../../img/social/instagram.svg";

const Footer = () => {
  return (
    <footer className="can-fade">
      <p>Cecilia Oh Fotografía</p>
      <div>
        <a
          className={styles["social-icon"]}
          href="https://www.instagram.com/ceciliaoh.ph/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={LogoInstagram} alt="Instagram" />
        </a>
      </div>
      <p>ceciliaoh.ph@gmail.com</p>
    </footer>
  );
};

export default Footer;
