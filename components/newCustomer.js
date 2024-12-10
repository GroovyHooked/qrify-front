import React from "react";
import styles from "../styles/signup.module.css";
import { useState } from "react";

function NewCustomer() {
  return (
    <div className={styles.container}>
      <div className={styles.containerGlobal}>
        <div className={styles.containerTitle}>
          <div>
            <h4 className={styles.title}>Ajouter un client</h4>
          </div>
        </div>
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
              <label className={styles.label}>Téléphone</label>
              <input
                className={styles.input}
                type="number"
                placeholder="Téléphone"
                id="phoneNumber"
                onChange={(e) => setSignUpPhoneNumber(e.target.value)}
                value={signUpCompany}
              />
            </div>

            <button
              className={styles.button}
              id="addCustomers"
              onClick={() => handleSignUp()}
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewCustomer;
