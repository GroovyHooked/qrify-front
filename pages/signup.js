import Head from "next/head";
import Image from "next/image";
import styles from "../styles/signup.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Créer un compte</h4>
    </div>
  );
}
