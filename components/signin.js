import styles from "../styles/Signin.module.css";

function SignIn() {
  return (
    <div className={styles.MMmain}>
      <div className={styles.body}>
        <div className={styles.bodyheader}>
          <div>Connexion</div>
        </div>
        <div className={styles.bodybody}>
          <div className={styles.photo}>photo</div>
          <div className={styles.containerconnexion}>
            <div className={styles.containerinput}>
              <div className={styles.inputglobal}>
                <div>Adresse Email</div>
                <button className={styles.input}></button>
              </div>
              <div className={styles.inputglobal}>
                <div>Mot de passe</div>
                <button className={styles.input}></button>
              </div>
            </div>
            <div className={styles.connexion}>
              Connectez-vous ou
              <div className={styles.lienclic}>créez un compte</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
