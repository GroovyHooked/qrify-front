import Navbar from '../components/navbar'
import Footer from '../components/footer'
import styles from '../styles/newcard.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addCardToStore } from '../reducers/data'
import { BASE_URL } from '../components/global'

export default function NewCard() {
    const dispatch = useDispatch()
    const router = useRouter();
    // données du client sauvegradées dans l'étape d'ajout de client afin d'afficher nom et prenom dans le composant et
    // Envoyer l'id du client au backend  afin de lier le client et la carte entre eux lors de la sauvegarde de la carte
    const dataFromStore = useSelector((state) => state.data.value)

    // Email du commerçant
    const merchantMail = useSelector((state) => state.user.value.email);

    const [recipientName, setRecipientName] = useState('')
    const [message, setMessage] = useState('')
    const [cardValue, setCardValue] = useState(0)
    const [error, setError] = useState('')

    // Envoi d'une requête en base de données afin de générer un code qr et de sauvegarder toutes les données liées à ce code qr en base de données
    const createCard = async () => {
        const res = await fetch(`${BASE_URL}/card/newcard`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipient: recipientName,
                message,
                totalValue: cardValue,
                customerId: dataFromStore.customer._id,
                merchantMail
            })
        })
        const data = await res.json()

        if (data.result) {
            // Enregistrement dans le store des données de la carte qui vient d'être créée 
            dispatch(addCardToStore(data.card))
            // Redirection vers la page d'affichage et de partage de la carte
            router.push('/sendcard')
        } else {
            setError(data.error)
        }
    }


    return (
        <>
            <Navbar status='avatar' />
            <div className={styles.container}>
                <div className={styles.progressContainer}>
                    <div className={styles.progressbar}>
                        <div className={styles.bar1}></div>
                        <div className={styles.bar2}></div>
                        <div className={styles.circle}>1</div>
                        <div className={styles.circle}>2</div>
                        <div className={styles.circle}>3</div>
                    </div>
                    <div className={styles.progressionText}>
                        <div className={styles.text}>Ajouter un client</div>
                        <div className={styles.text}>Générer une carte</div>
                        <div className={styles.text}>Partager la carte</div>
                    </div>
                </div>

                <div className={styles.innerContainer}>
                    <div className={styles.header}>
                        <h2 className={styles.title} >Carte cadeau de {dataFromStore.firstname} {dataFromStore.lastname}</h2>
                    </div>
                    <div style={{ color: 'red', margin: '10px' }}>{error && error}</div>
                    <div className={styles.formContainer}>
                        <img src='/image/gift.png' className={styles.image} />
                        <div className={styles.form}>
                            <div className={styles.name} >
                                <label className={styles.label}>Nom</label>
                                <input
                                    onChange={(e) => setRecipientName(e.target.value)}
                                    value={recipientName}
                                    className={styles.input1}
                                    type="text"
                                />
                            </div>
                            <div className={styles.message} >
                                <label className={styles.label}>Message</label>
                                <textarea
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    className={styles.textarea}
                                    type="text"
                                ></textarea>
                            </div>
                            <div className={styles.value} >
                                <label className={styles.label}>Valeur</label>
                                <input
                                    onChange={(e) => setCardValue(e.target.value)}
                                    value={cardValue}
                                    className={styles.input3}
                                    type="number"
                                />
                            </div>
                            <button
                                onClick={() => createCard()}
                                className={styles.button}>Créer la carte</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}