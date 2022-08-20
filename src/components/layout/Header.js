import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavMenu, { disableNavMenuComponent } from "./NavMenu";
import styles from "./Header.module.css";
import LogoInstagram from "../../img/social/instagram.svg";

const Header = () => {
  const { pathname } = useLocation();
  const [isMobileNavMenuEnabled, setIsMobileNavMenuEnabled] = useState(false);
  return (
    <>
      <header>
        <div
          id="burguerButton"
          className={"burguer-button"}
          onClick={() =>
            isMobileNavMenuEnabled
              ? disableNavMenuComponent(setIsMobileNavMenuEnabled)
              : setIsMobileNavMenuEnabled(true)
          }
        >
          <div className={"bar1"}></div>
          <div className={"bar2"}></div>
          <div className={"bar3"}></div>
        </div>
        <div className={styles["site-title"]}>
          <Link to="/">Cecilia Oh</Link>
        </div>
        <nav className={styles["desktop-nav"]}>
          <Link
            to="/"
            className={
              pathname === "/"
                ? styles["desktop-nav-link-selected-underline"]
                : undefined
            }
          >
            Trabajo
          </Link>
          <Link
            to="/contact"
            className={
              pathname === "/contact"
                ? styles["desktop-nav-link-selected-underline"]
                : undefined
            }
          >
            Contacto
          </Link>
          <a
            href="https://www.instagram.com/ceciliaoh.ph/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={LogoInstagram} alt="Instagram" />
          </a>
        </nav>
      </header>
      {isMobileNavMenuEnabled && (
        <NavMenu setIsMobileNavMenuEnabled={setIsMobileNavMenuEnabled} />
      )}
    </>
  );
};

export default Header;
