import React from "react";
import styles from "../styles/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ toto }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <FontAwesomeIcon
          icon={faQrcode}
          width="30"
          height="30"
          color="#333e63"
        />
        <div> QRify</div>
      </div>
      <div className={styles.btn}>
        <button className={styles.btnLogin}>{toto}</button>
      </div>
    </div>
  );
}
