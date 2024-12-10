import styles from "../styles/Signin.module.css";
import Link from "next/link";

function SignIn() {
  return (
    <div className={styles.container}>
      <div className={styles.containerglobal}>
        <div className={styles.containertitle}>
          <div className={styles.title}>Connexion</div>
        </div>
        <div className={styles.containerImgForm}>
          <div className={styles.containerImage}>photo</div>
          <div className={styles.containerForm}>
            <div className={styles.error}></div>
            <div className={styles.registerSection}>
              <div className={styles.inputgroup}>
                <label className={styles.text}>Adresse e-mail</label>
                <input
                  className={styles.input}
                  placeholder="Thomascarriot@gmail.com"
                />
              </div>
              <div className={styles.inputgroup}>
                <label className={styles.text}>Mot de passe</label>
                <input className={styles.input} placeholder="" />
              </div>
              <button className={styles.button} id="signUp">
                Créer mon compte
              </button>
            </div>
            <div className={styles.containerBottomText}>
              <h6>
                Connectez-vous ou <Link href="">créez un compte</Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
