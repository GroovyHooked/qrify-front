import React from "react";
import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.text}>Politique de Confidentialité</div>
        <div className={styles.text}>Condition générales</div>
      </div>
    </div>
  );
}
