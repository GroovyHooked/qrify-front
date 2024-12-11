import Footer from "../components/footer";
import Navbar from "../components/navbar";
import styles from "../styles/signup.module.css";
import { useState } from "react";
import Link from "next/link";

function Signup() {
  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpLastname, setSignUpLastname] = useState("");
  const [signUpMail, setSignUpMail] = useState("");
  const [signUpCompany, setSignUpCompany] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleSignUp = () => {
    fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: signUpFirstname,
        lastname: signUpLastname,
        email: signUpMail,
        company: signUpCompany,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          setSignUpFirstname("");
          setSignUpLastname("");
          setSignUpMail("");
          setSignUpCompany("");
          setSignUpPassword("");
          setMessageError("");
        } else {
          setMessageError(data.error);
        }
      });
  };

  return (
    <>
      <Navbar status="Connexion" href="/" />
      <div className={styles.container}>
        <div className={styles.containerGlobal}>
          <div className={styles.containerTitle}>
            <div>
              <h4 className={styles.title}>Créer un compte</h4>
            </div>
          </div>
          <div className={styles.containerImgForm}>
            <div className={styles.containerImage}></div>
            <div className={styles.containerForm}>
              <div className={styles.error}>{messageError && messageError}</div>
              <div className={styles.registerSection}>
                <div>
                  <label className={styles.label}>Nom</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Nom"
                    id="signUpFirstName"
                    onChange={(e) => setSignUpFirstname(e.target.value)}
                    value={signUpFirstname}
                  />
                </div>
                <div>
                  <label className={styles.label}>Prénom</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Prénom"
                    id="signUpLastName"
                    onChange={(e) => setSignUpLastname(e.target.value)}
                    value={signUpLastname}
                  />
                </div>
                <div>
                  <label className={styles.label}>Email</label>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="Adresse email"
                    id="signUpMail"
                    onChange={(e) => setSignUpMail(e.target.value)}
                    value={signUpMail}
                  />
                </div>
                <div>
                  <label className={styles.label}>Entreprise</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Entreprise"
                    id="signUpCompany"
                    onChange={(e) => setSignUpCompany(e.target.value)}
                    value={signUpCompany}
                  />
                </div>
                <div>
                  <label className={styles.label}>Mot de passe</label>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Mot de passe"
                    id="signUpPassword"
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    value={signUpPassword}
                  />
                </div>
                <button
                  className={styles.button}
                  id="signUp"
                  onClick={() => handleSignUp()}
                >
                  Créer mon compte
                </button>
              </div>
              <div className={styles.containerBottomText}>
                <h6>
                  Déjà membre?<Link href="">Se connecter</Link>{" "}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
