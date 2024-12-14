// import React from "react";
import styles from "../styles/sendCard.module.css";
import { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faPrint,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { BASE_URL } from '../components/global'
import Image from 'next/image'

function SendCard() {
  const [imageSrc, setImageSrc] = useState('')
  const [imageInfo, setImageInfo] = useState('')
  const data = useSelector((state) => state.data.value)

  const totRef = useRef()

  const [print, setPrint] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [sendEmail, setSendEmail] = useState("");


  const downloadFile = async () => {
    const response = await fetch(`${BASE_URL}/card/download/${data.card.cardId}`);
    const response2 = await fetch(`${BASE_URL}/card/datacard/${data.card.cardId}`);
    const blob = await response.blob();
    const cardInfo = await response2.json()
    console.log({ cardInfo });

    setImageInfo(cardInfo.cardData.totalValue)
    const url = URL.createObjectURL(blob);
    setImageSrc(url)
  };

  useEffect(() => {
    (async () => {
      await downloadFile()
    })()
  }, [])

  const handlePrint = () => {
    const printContent = totRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;

    window.print();

    document.body.innerHTML = originalContent;
  };
  const handleSendMessage = () => { };
  const handleSendEmail = () => { };

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
          <div className={styles.containerTitle}>
            <div className={styles.titleBar}>
              <h4 className={styles.title}>Partager la carte</h4>
            </div>
          </div>
          <div className={styles.containerCard}>
            <div className={styles.card} ref={totRef} >
              <div className={styles.qrcode}>
                {imageSrc && <Image
                  width='100'
                  height='100'
                  src={imageSrc} />}
              </div>
              <div className={styles.value}>
                <p style={{ textAlign: 'center' }}>{imageInfo && `${imageInfo}€`}</p>
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
                onClick={() => handleSendEmail()}
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
