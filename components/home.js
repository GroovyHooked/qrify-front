import NavigationCard from './navigationCard'
import Navbar from '../components/navbar'
import styles from '../styles/home.module.css'
import Footer from '../components/footer'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import { useEffect } from 'react'
import { redirectUserIfNotConnected } from '../utils/utils'

import { faQrcode, faAddressCard, faGear, faUser, faChartPie } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    const router = useRouter();
    const user = useSelector((state) => state.user.value)

    // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
    useEffect(() => {
        redirectUserIfNotConnected(user, router)
    }, [])

    return (
        <>
            <Navbar status='avatar' />
            <div className={styles.container} >
                <div className={styles.contentWrapper}>
                    <h2 className={styles.title}>Gérez vos cartes cadeaux en quelques clics</h2>
                    <div className={styles.cardContainer} >
                        <NavigationCard src="/images/client.jpg" icon={faUser} title="Ajouter un client" description="Ajoutez un clien afin de générer une carte" link="newcustomer" progressStatus="Ajouter un client" />
                        <NavigationCard src="/images/merchant2.jpg" icon={faAddressCard} title="Sélectionner un client" description="Créez une carte à partir d'un client enregistré" link="listCustomers" progressStatus="Sélectionner un client" />
                    </div>
                    <div className={styles.cardContainer} >
                        <NavigationCard src="/images/scan.jpg" icon={faQrcode} title="Scanner une carte" description="Scannez une carte avec votre appareil photo" link="scan" />
                        <NavigationCard src="/images/gestion.jpg" icon={faChartPie} title="Gestion des cartes" description="Historique et montants générés de vos cartes" link="" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

