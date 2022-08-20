import React from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <main className={[styles["contact-main"], "can-fade"].join(" ")}>
      <p>
        <strong>Contacto</strong>
      </p>
      <p>Mail: ceciliaoh.ph@gmail.com</p>
      <p>Tel: +54 9 1155151460</p>
    </main>
  );
};

export default Contact;
