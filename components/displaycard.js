import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BASE_URL } from './global';
import Navbar from './navbar';
import Footer from './footer';
import styles from '../styles/displaycard.module.css'
import Image from 'next/image'

const DisplayCard = () => {
    const router = useRouter();
    const [cardData, setCardData] = useState({})
    const [imageSrc, setImageSrc] = useState('')
    // Récupération des données de l'URL
    const { cardId } = router.query;

    // Fonction asynchrone pour récupérer le QR code depuis le backend
    const retrieveQrCodeFromBackend = async () => {
        const response = await fetch(`${BASE_URL}/card/download/${cardId}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url)
    };

    // Effet pour charger les données de la carte lorsqu'un cardId est présent
    useEffect(() => {
        if (cardId) {
            (async () => {
                await retrieveQrCodeFromBackend()
                const res = await fetch(`${BASE_URL}/card/datacard/${cardId}`)
                const cardData = await res.json()
                console.log({ cardData: cardData.cardData.totalValue });
                setCardData(cardData)
            })()
        }
    }, [cardId])

    // Affichage d'un message de chargement tant que cardId n'est pas encore récuperé 
    if (!cardId) {
        return <p>Chargement...</p>;
    }

    return (
        <>
            <Navbar status="avatar" />
            <div className={styles.page_container} >
                <div className={styles.innercontainer}>
                    <h2 className={styles.page_title}>Carte N°: {cardId}</h2>
                    {imageSrc &&
                        <Image
                            alt="qrcode"
                            width='100'
                            height='100'
                            src={imageSrc} />}
                    <div className={styles.card_data}>
                        {cardData.cardData && <p>Carte de {cardData.cardData.recipient}</p>}
                        {cardData.cardData && <p>D'une valeur de {cardData.cardData.totalValue}€</p>}
                        {cardData.customer && <p>Offerte pas {cardData.customer.lastname} {cardData.customer.firstname}</p>}
                    </div>
                    <button className={styles.button} type='submit'>Valider</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DisplayCard;