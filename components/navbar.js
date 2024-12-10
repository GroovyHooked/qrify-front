import React from "react";
import Image from "next/image";
import styles from "../styles/navbar.module.css";


export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <Image src="qrcode-solid.svg" width="30" height="30" />
                <div>QRify</div>
            </div>
            <div className={styles.btn}>
                <button className={styles.btnLogin}>Inscription</button>
            </div>
        </div>
    );
}