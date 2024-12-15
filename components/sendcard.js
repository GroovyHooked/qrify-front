import React from "react";
import styles from "../styles/sendCard.module.css";
import { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faPrint,
  faEnvelope,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";


function SendCard() {
  const [print, setPrint] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [recipientMail, setRecipientMail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)

  const cardData = useSelector((state) => state.data.value)

  const handlePrint = () => { };
  const handleSendMessage = () => { };
  
  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipientMail,
          subject: `Carte cadeau ${cardData.customer.lastname}`,
          text: cardData.card.message
        }),
      });

      if (response.ok) {
        console.log("Email envoyé avec succès !");
      } else {
        console.log("Erreur lors de l'envoi de l'email.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      console.log("Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <>
      <Navbar status="avatar" />
      <div className={styles.container}>
        <div className={styles.containerProgress}>
          <div className={styles.bar}></div>
          <div className={styles.circle}>1</div>
          <div className={styles.circle}>2</div>
          <div className={styles.circle}>3</div>
        </div>
        <div className={styles.containerProgressText}>
          <div className={styles.progressText}>Ajouter un client</div>
          <div className={styles.progressText}>Générer une carte</div>
          <div className={styles.progressText}>Partager la carte</div>
        </div>

        <div className={styles.containerGlobal}>

          {isModalOpen &&
            <div className={styles.modal_container}>
              <FontAwesomeIcon
                onClick={handleModal}
                icon={faXmark}
                className={styles.modal_icon} />
              <p className={styles.modal_title}>Entrez l'adresse mail du destinataire</p>
              <div className={styles.modal_content}>
                <input
                  value={recipientMail}
                  onChange={(e) => setRecipientMail(e.target.value)}
                  type="email"
                  className={styles.email_input} />
                <button
                  onClick={handleSendEmail}
                  type="submit"
                  className={styles.modal_button}>Envoyer</button>
              </div>
            </div>}
          
          <div className={styles.containerTitle}>
            <div className={styles.titleBar}>
              <h4 className={styles.title}>Partager la carte</h4>
            </div>
          </div>
          <div className={styles.containerCard}>
            <div className={styles.card}>
              <div className={styles.qrcode}></div>
              <div className={styles.value}></div>
            </div>
          </div>
          <div className={styles.containerButton}>
            <div>
              <button
                className={styles.button}
                id="addCustomers"
                onClick={() => handlePrint()}
              >
                <div className={styles.spaceInButton}>
                  <FontAwesomeIcon icon={faPrint} size="2xl" color="#ffff" />
                  <div>Imprimer</div>
                </div>
              </button>
            </div>
            <div className={styles.logotext}>
              <button
                className={styles.button}
                id="addCustomers"
                onClick={() => handleSendMessage()}
              >
                <div className={styles.spaceInButton}>
                  <FontAwesomeIcon icon={faMessage} size="2xl" color="#ffff" />
                  <div>Message</div>
                </div>
              </button>
            </div>
            <div className={styles.logotext}>
              <button
                className={styles.button}
                id="addCustomers"
                onClick={handleModal}
              >
                <div className={styles.spaceInButton}>
                  <FontAwesomeIcon icon={faEnvelope} size="2xl" color="#ffff" />
                  <div>Email</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default SendCard;
