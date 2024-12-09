import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomeScreen() {
  return (
    <div>
      <FontAwesomeIcon icon={faqrcode} className={styles.qrIcon} />
      <h5>QRify</h5>
    </div>
  );
}
