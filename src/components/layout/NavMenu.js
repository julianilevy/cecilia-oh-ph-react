import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import LogoInstagram from "../../img/social/instagram.svg";

const enableNavMenuComponent = () => {
  const burguerButton = document.querySelector("#burguerButton");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const nav = document.querySelector("#mobileNav");

  burguerButton.classList.add("bar-change");
  main.classList.add("faded-out");
  footer.classList.add("faded-out");

  setTimeout(() => {
    nav.classList.remove("faded-out");
    nav.classList.add("faded-in");
  }, 100);

  const onNavTransitionEnd = () => {
    nav.removeEventListener("transitionend", onNavTransitionEnd);

    main.classList.add("hidden");
    footer.classList.add("hidden");
  };

  nav.addEventListener("transitionend", onNavTransitionEnd);
};

export const disableNavMenuComponent = (setIsMobileNavMenuEnabled) => {
  const burguerButton = document.querySelector("#burguerButton");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const nav = document.querySelector("#mobileNav");

  burguerButton.classList.remove("bar-change");
  main.classList.remove("hidden");
  footer.classList.remove("hidden");

  setTimeout(() => {
    nav.classList.remove("faded-in");
    nav.classList.add("faded-out");

    main.classList.remove("faded-out");
    footer.classList.remove("faded-out");
  }, 100);

  const onNavTransitionEnd = () => {
    nav.removeEventListener("transitionend", onNavTransitionEnd);
    setIsMobileNavMenuEnabled(false);
  };

  nav.addEventListener("transitionend", onNavTransitionEnd);
};

const instantDisableNavMenuComponent = (setIsMobileNavMenuEnabled) => {
  const burguerButton = document.querySelector("#burguerButton");
  burguerButton.classList.remove("bar-change");

  const footer = document.querySelector("footer");
  footer.classList.remove("hidden");
  footer.classList.remove("faded-out");

  setIsMobileNavMenuEnabled(false);
};

const NavMenu = ({ setIsMobileNavMenuEnabled }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    enableNavMenuComponent();
  }, []);

  return (
    <nav
      id="mobileNav"
      className={[styles["mobile-nav"], "can-fade", "faded-out"].join(" ")}
    >
      <Link
        to={"/"}
        onClick={() =>
          pathname !== "/" &&
          instantDisableNavMenuComponent(setIsMobileNavMenuEnabled)
        }
      >
        <p className={[styles["nav-link"], styles["nav-link-1"]].join(" ")}>
          Trabajo
          {pathname === "/" && (
            <span
              className={[
                styles["nav-link-selected-underline"],
                styles["nav-link-1-selected-underline"],
              ].join(" ")}
            ></span>
          )}
        </p>
      </Link>
      <Link
        to={"/contact"}
        onClick={() =>
          pathname !== "/contact" &&
          instantDisableNavMenuComponent(setIsMobileNavMenuEnabled)
        }
      >
        <p className={[styles["nav-link"], styles["nav-link-2"]].join(" ")}>
          Contacto
          {pathname === "/contact" && (
            <span
              className={[
                styles["nav-link-selected-underline"],
                styles["nav-link-2-selected-underline"],
              ].join(" ")}
            ></span>
          )}
        </p>
      </Link>
      <a
        href="https://www.instagram.com/ceciliaoh.ph/"
        target="_blank"
        rel="noreferrer"
      >
        <img src={LogoInstagram} alt="Instagram" />
      </a>
    </nav>
  );
};

export default NavMenu;
