import React from "react";

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
              <input
                className={styles.input}
                type="text"
                placeholder="Nom"
                id="signUpFirstName"
                onChange={(e) => setSignUpFirstname(e.target.value)}
                value={signUpFirstname}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="Prénom"
                id="signUpLastName"
                onChange={(e) => setSignUpLastname(e.target.value)}
                value={signUpLastname}
              />
              <input
                className={styles.input}
                type="email"
                placeholder="Adresse email"
                id="signUpMail"
                onChange={(e) => setSignUpMail(e.target.value)}
                value={signUpMail}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="Entreprise"
                id="signUpCompany"
                onChange={(e) => setSignUpCompany(e.target.value)}
                value={signUpCompany}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                id="signUpPassword"
                onChange={(e) => setSignUpPassword(e.target.value)}
                value={signUpPassword}
              />
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
                Déjà menbre?<Link href="">Se connecter</Link>{" "}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
