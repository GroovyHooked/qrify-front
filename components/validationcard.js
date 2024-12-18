import { useState, useEffect } from "react";
import styles from "../styles/validationcard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

const ValidationCard = () => {
  const [cardInfo, setCardInfo] = useState({});

  //   useEffect(() => {
  //     fetch("http://localhost:3000/auth")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Données recues : ", data);
  //         setCardInfo(data);
  //       })
  //       .catch((error) => console.error("Erreur lors du fetch : ", error));
  //   });

  const router = useRouter();

  const { cardId } = router.query;
  console.log({ cardId });

  useEffect(() => {
    fetch(`http://localhost:3000/card/cardData/${cardId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("customer est égal a", data.customer);
        console.log("card est égal a", data.dataCard);
        setCardInfo(data);
      })
      .catch((error) => console.error("Erreur lors du fetch : ", error));
  }, []);

  useEffect(() => {
    console.log({ cardInfo });
  }, [cardInfo]);

  return (
    <>
      <NavBar status="avatar" />
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardTitle}>Validation carte</div>
          <div className={styles.containercenter}>
            <div className={styles.cardDetails}>
              <div>
                {cardInfo?.customer?.firstname} {cardInfo?.customer?.lastname}
              </div>
            </div>
            <div className={styles.cardDetails}>
              <div>{cardInfo?.customer?.phoneNumber}</div>
              <br />
              <div>{cardInfo?.customer?.email}</div>
              <br />
              <div>
                {new Date(cardInfo?.dataCard?.date).toLocaleDateString()}{" "}
                {new Date(cardInfo?.dataCard?.date).toLocaleTimeString()}
              </div>
            </div>
            <div className={styles.cardDetails}>
              <div>{cardInfo?.dataCard?.recipient}</div>
            </div>

            <div>{cardInfo?.dataCard?.path}</div>

            <div className={styles.cardDetails}>
              <div>{cardInfo?.dataCard?.totalValue} €</div>
            </div>
          </div>
          <div className={styles.validateButton}>
            <div className={styles.button} onClick={() => router.push("/home")}>
              Retour à l'accueil
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ValidationCard;
