// import React from "react";
import styles from "../styles/sendCard.module.css";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faPrint,
  faEnvelope,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { redirectUserIfNotConnected } from "../utils/utils";
import { BASE_URL } from "../utils/utils";
import Image from "next/image";
import UserProgress from "../components/userProgress";

function SendCard() {
  const router = useRouter();
  // Référence à la div contenant le code QR
  const qrCodeDivRef = useRef();

  // source du code utilisé pour l'afficher
  const [imageSrc, setImageSrc] = useState("");

  const [cardValue, setCardValue] = useState("");
  const [recipientMail, setRecipientMail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailServiceResponse, setEmailServiceResponse] = useState({
    isSucces: true,
    message: "Envoyer un email"
  })
  const [isModalMessageOpen, setIsModalMessageOpen] = useState(false)
  const [phoneCustomer, setPhoneCustomer] = useState('')

  // const [emailServiceResponse, setEmailServiceResponse] = useState("")

  // Sélection des données utilisateur et de la carte depuis le store Redux
  const user = useSelector((state) => state.user.value);
  const dataFromStore = useSelector((state) => state.data.value);
  console.log({ dataFromStore });

  // Fonction pour gérer l'ouverture/fermeture de la modal
  const handleModalMessage = () => {
    setIsModalMessageOpen(!isModalMessageOpen);
  };

  const handleSendMessage = async (cardValue, firstname, lastname) => {
    // setPhoneCustomer((current) => current.slice(1));
    let temp = phoneCustomer;
    temp = temp.slice(1);

    var requestOptions = {
      method: "GET",
      mode: "no-cors", // Ajout du mode no-cors
      redirect: "follow",
    };
    console.log("test", phoneCustomer);

    const message = `Voici votre carte cadeau de la part de ${firstname} ${lastname} d'une valeur de: ${cardValue} €`;
    const API_KEY_callmebot = "4749115";

    console.log(
      `https://api.callmebot.com/whatsapp.php?phone=+33${temp}&text=${message}&apikey=${API_KEY_callmebot}`
    );

    const response = fetch(
      `https://api.callmebot.com/whatsapp.php?phone=+33${temp}&text=${message}&apikey=${API_KEY_callmebot}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    console.log("result");
    setPhoneCustomer("");
  };

  // Fonction pour gérer l'ouverture/fermeture de la modal
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Fonction asynchrone pour envoyer un email depuis le backend
  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/email/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipientMail,
          subject: `Carte cadeau ${dataFromStore?.customer.lastname}`,
          text: dataFromStore?.card.message,
          cardId: dataFromStore?.card.cardId,
        }),
      });

      if (response.ok) {
        console.log("Email envoyé avec succès !");
        setEmailServiceResponse((current) => ({
          ...current,
          isSucces: true,
          message: "Email envoyé avec succès !",
        }));
      } else {
        console.log("Erreur lors de l'envoi de l'email");
        setEmailServiceResponse((current) => ({
          ...current,
          isSucces: false,
          message: "Erreur lors de l'envoi de l'email.",
        }));
      }
    } catch (error) {
      console.error("Erreur :", error);
      setEmailServiceResponse((current) => ({
        ...current,
        isSucces: false,
        message: "Erreur lors de l'envoi de l'email.",
      }));
    }
  };

  // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
  useEffect(() => {
    redirectUserIfNotConnected(user, router);
  }, []);

  // Fonction asynchrone pour récupérer le code QR et les informations de la carte depuis le backend
  const retrieveQrCodeFromBackend = async () => {
    try {
      if (dataFromStore && dataFromStore.card && dataFromStore.card.cardId) {
        const res = await fetch(
          `${BASE_URL}/card/download/${dataFromStore.card.cardId}`
        );
        const cardDataResponse = await fetch(
          `${BASE_URL}/card/datacard/${dataFromStore.card.cardId}`
        );
        const cardData = await res.json();
        const dataFromBack = await cardDataResponse.json();

        setCardValue(dataFromBack.cardData.totalValue);
        setImageSrc(cardData.cardPath);
      } else {
        console.error("Invalid cardValue structure or missing cardId");
      }
    } catch (error) {
      console.error("Error fetching QR code or card data:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await retrieveQrCodeFromBackend();
    })();
  }, []);

  // Fonction pour imprimer le contenu de la div contenant le code QR
  const handlePrint = () => {
    const printContent = qrCodeDivRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  };
  console.log(cardValue);
  return (
    <>
      <Navbar status="avatar" />
      <div className={styles.container}>
        <UserProgress progress="3" />
        <div className={styles.containerGlobal}>
          {isModalMessageOpen && (
            <div className={styles.modal_container}>
              <FontAwesomeIcon
                icon={faXmark}
                className={styles.modal_icon}
                onClick={handleModalMessage}
              />
              <p className={styles.modal_title}>
                Entrez le téléphone portable du destinataire
              </p>
              <div className={styles.modal_content}>
                <input
                  placeholder="Entrez le numéro de téléphone"
                  type="tel"
                  id="phone"
                  className={styles.email_input}
                  onChange={(e) => setPhoneCustomer(e.target.value)}
                  value={phoneCustomer}
                />
                <button
                  onClick={() => {
                    handleSendMessage(cardValue, dataFromStore.customer.firstname, dataFromStore.customer.lastname);
                  }}
                  type="submit"
                  className={styles.modal_button}
                >
                  Envoyer
                </button>
              </div>
            </div>
          )}

          {isModalOpen && (
            <div className={styles.modal_container}>
              <FontAwesomeIcon
                onClick={handleModal}
                icon={faXmark}
                className={styles.modal_icon}
              />
              <div
                style={!emailServiceResponse.isSucces ? { color: 'red' } : { fontWeight: 'bold', fontSize: '20px' }}
                className={styles.fetch_response}>
                {emailServiceResponse.message && emailServiceResponse.message}
              </div>
              <p className={styles.modal_title}>
                Entrez l'adresse mail du destinataire
              </p>
              <div className={styles.modal_content}>
                <input
                  value={recipientMail}
                  onChange={(e) => setRecipientMail(e.target.value)}
                  type="email"
                  className={styles.email_input}
                />
                <button
                  onClick={handleSendEmail}
                  type="submit"
                  className={styles.modal_button}
                >
                  Envoyer
                </button>
              </div>
            </div>
          )}

          <div className={styles.containerTitle}>
            <div className={styles.titleBar}>
              <h4 className={styles.title}>Partager la carte</h4>
            </div>
          </div>
          <div className={styles.containerCard}>
            <div className={styles.card} ref={qrCodeDivRef}>
              <div className={styles.qrcode}>
                {imageSrc && (
                  <Image alt="qrcode" width="150" height="150" src={imageSrc} />
                )}
              </div>
              <div className={styles.value}>
                <p className={styles.textinfos}>
                  Carte de:{" "}
                  {dataFromStore && `${dataFromStore?.customer.firstname || "Aucune carte créée"}`}{" "}
                  {dataFromStore && `${dataFromStore?.customer.lastname || "Aucune carte créée"}`}
                </p>
                <p className={styles.textinfos}>
                  {dataFromStore && `${dataFromStore?.customer.email || "Aucune carte créée"}`}
                </p>
                <p className={styles.textinfos}>
                  Pour: {dataFromStore && `${dataFromStore?.card.recipient || "Aucune carte créée"}`}
                </p>
                <p className={styles.textinfos}>
                  {dataFromStore && `${dataFromStore?.card.totalValue || "Aucune carte créée"}€`}
                </p>
                <p className={styles.textinfosText}>
                  {dataFromStore?.card.message}
                </p>
                <p style={{ textAlign: "center" }}>
                  {cardValue && `${cardValue}€`}
                </p>
              </div>
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
                onClick={handleModalMessage}
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
