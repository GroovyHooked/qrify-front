// import React from "react";
import styles from "../styles/sendCard.module.css";
import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMessage,
    faPrint,
    faEnvelope,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import { redirectUserIfNotConnected } from '../utils/utils'
import { BASE_URL } from '../utils/utils';
import Image from 'next/image'
import UserProgress from '../components/userProgress'


function SendMessage() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Fonction pour gérer l'ouverture/fermeture de la modal
    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleSendMessage = () => {
        console.log('test');

    }

    return (
        <>
            <Navbar status="avatar" />
            <div className={styles.container}>
                <UserProgress progress="3" />
                <div className={styles.containerGlobal}>

                    {isModalOpen &&
                        <div className={styles.modal_container}>
                            <FontAwesomeIcon
                                onClick={handleModal}
                                icon={faXmark}
                                className={styles.modal_icon} />
                            <div
                                style={!emailServiceResponse.isSucces ? { color: 'red' } : { fontWeight: 'bold', textDecoration: 'underline' }}
                                className={styles.fetch_response}>
                                {emailServiceResponse.message && emailServiceResponse.message}
                            </div>
                            <p className={styles.modal_title}>Entrez l'adresse mail du destinataire</p>
                            <div className={styles.modal_content}>
                                <input
                                    type="email"
                                    className={styles.email_input} />
                                <button
                                    onClick={() => { }}
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
                        <div className={styles.card} >
                            <div className={styles.qrcode}>

                            </div>
                            <div className={styles.value}>
                            </div>
                        </div>
                    </div>
                    <div className={styles.containerButton}>
                        <div>
                            <button
                                className={styles.button}
                                id="addCustomers"
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
export default SendMessage;
