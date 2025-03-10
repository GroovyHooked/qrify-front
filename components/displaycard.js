import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/utils";
import Navbar from "./navbar";
import Footer from "./footer";
import styles from "../styles/displaycard.module.css";
import Image from "next/image";

const DisplayCard = () => {
  const router = useRouter();
  const [cardData, setCardData] = useState({});
  const [imageSrc, setImageSrc] = useState("");
  const [cardUpdateValue, setCardUpdateValue] = useState(0);
  const [messageError, setMessageError] = useState("");
  const [messageValidated, setMessageValidated] = useState("");
  // Récupération des données de l'URL
  const { cardId } = router.query;

  // Fonction asynchrone pour récupérer le QR code depuis le backend
  const retrieveQrCodeFromBackend = async () => {
    const response = await fetch(`${BASE_URL}/card/download/${cardId}`);
    const cardData = await response.json();
    setImageSrc(cardData.cardPath);
  };

  // Effet pour charger les données de la carte lorsqu'un cardId est présent
  useEffect(() => {
    if (cardId) {
      (async () => {
        await retrieveQrCodeFromBackend();
        const res = await fetch(`${BASE_URL}/card/datacard/${cardId}`);
        const cardData = await res.json();
        setCardData(cardData);
        setCardUpdateValue(cardData.cardData.remainingValue);
      })();
    }
  }, [cardId]);

  // Affichage d'un message de chargement tant que cardId n'est pas encore récuperé
  if (!cardId) {
    return <p>Chargement...</p>;
  }
  // Modification de la valeur d'une carte lorsqu'elle est scannée
  const updateValue = async () => {
    try {
      if (cardId) {
        const response = await fetch(
          `${BASE_URL}/scancard/updateValue/${cardId}`,
          {
            method: "PUT",
          }
        );
        const data = await response.json();

        if (data.result) {
          setCardUpdateValue(0);
          setMessageValidated("La carte a bien été débitée");
        } else {
          setMessageError(data.error);
          setMessageValidated("");
        }
      }
    } catch (error) {
      console.error("Error fetching QR code or card data:", error);
    }
  };

  const handleReturn = () => {
    router.push("/home");
  };

  let textstyle = {};
  if (messageValidated) {
    textstyle = { color: "rgb(38, 0, 255)" };
  } else if (messageError) {
    textstyle = { color: "rgb(255, 6, 6)" };
  }

  return (
    <div>
      <Navbar status="avatar" />
      <div className={styles.page_container}>
        <div className={styles.innercontainer}>
          <div className={styles.messagebuttonreturn}>
            <div>
              <div style={textstyle}>
                {messageError && messageError}
                {messageValidated && messageValidated}
              </div>
            </div>
            <div>
              <button
                className={styles.buttonreturn}
                type="submit"
                onClick={() => handleReturn()}
              >
                Retour Menu
              </button>
            </div>
          </div>

          <h2 className={styles.page_title}>Carte N°: {cardId}</h2>
          {imageSrc && (
            <Image alt="qrcode" width="100" height="100" src={imageSrc} />
          )}
          <div className={styles.card_data}>
            {cardData.cardData && <p>Carte de {cardData.cardData.recipient}</p>}
            {cardData.cardData && <p>D&apos;une valeur de {cardUpdateValue}€</p>}
            {cardData.customer && (
              <p>
                Offerte par {cardData.customer.lastname}{" "}
                {cardData.customer.firstname}
              </p>
            )}
          </div>
          <button
            className={styles.button}
            type="submit"
            onClick={() => updateValue()}
          >
            Valider
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DisplayCard;
