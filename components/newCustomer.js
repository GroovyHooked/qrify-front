import { useState, useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { BASE_URL } from "../utils/utils";
import { addCustomerToStore } from "../reducers/data";
import styles from "../styles/newCustomers.module.css";
import { redirectUserIfNotConnected } from "../utils/utils";
import UserProgress from '../components/userProgress'

function NewCustomer() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpLastname, setSignUpLastname] = useState("");
  const [signUpMail, setSignUpMail] = useState("");
  const [signUpPhoneNumber, setSignUpPhoneNumber] = useState("");
  const [messageError, setMessageError] = useState("");

  const user = useSelector((state) => state.user.value);

  // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
  useEffect(() => {
    redirectUserIfNotConnected(user, router);
  }, []);

  const handleSignUp = () => {
    fetch(`${BASE_URL}/customers/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: signUpFirstname,
        lastname: signUpLastname,
        email: signUpMail,
        phoneNumber: signUpPhoneNumber,
        // Envoi du mail du commerçant afin de son objectId en base de données
        merchantMail: user.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        if (data.result) {
          // Sauvegrade des données du client dans le store redux afin d'afficher nom et prenom sur la page de création de carte
          // et envoyer d'id du client au backend pour lier la carte et le client entre eux lors de la sauvegarde de la carte
          dispatch(addCustomerToStore(data.customer));
          router.push("/newcard");
        } else {
          setMessageError(data.error);
        }
      });
  };

  return (
    <>
      <Navbar status="avatar" href="/" />
      <div className={styles.container}>
        <UserProgress progress="1" />
        <div className={styles.containerGlobal}>
          <div className={styles.containerTitle}>
            <div className={styles.titleBar}>
              <h4 className={styles.title}>Ajouter un client</h4>
            </div>
          </div>
          <div className={styles.registerSection}>
            <div className={styles.name}>
              <div>
                <label className={styles.label}>Nom</label>
                <input
                  className={styles.inputName}
                  type="text"
                  placeholder="Nom"
                  id="signUpFirstName"
                  onChange={(e) => setSignUpLastname(e.target.value)}
                  value={signUpLastname}
                />
              </div>
              <div>
                <label className={styles.label}>Prénom</label>
                <input
                  className={styles.inputName}
                  type="text"
                  placeholder="Prénom"
                  id="signUpLastName"
                  onChange={(e) => setSignUpFirstname(e.target.value)}
                  value={signUpFirstname}
                />
              </div>
            </div>
            <div className={styles.mailTel}>
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
                  type="tel"
                  placeholder="Téléphone"
                  id="phoneNumber"
                  onChange={(e) => setSignUpPhoneNumber(e.target.value)}
                  value={signUpPhoneNumber}
                />
              </div>
            </div>
            <div className={styles.error}>{messageError && messageError}</div>
          </div>
          <div className={styles.containerButton}>
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
      <Footer />
    </>
  );
}
export default NewCustomer;
