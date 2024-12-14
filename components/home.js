import NavigationCard from './navigationCard'
import Navbar from '../components/navbar'
import styles from '../styles/home.module.css'
import Footer from '../components/footer'

import { faQrcode, faAddressCard, faGear, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    return (
        <>
            <Navbar status='avatar' />
            <div className={styles.container} >
                <div className={styles.contentWrapper}>
                    <h2 className={styles.title}>Gérez vos cartes cadeaux en quelques clics</h2>
                    <div className={styles.cardContainer} >
                        <NavigationCard src="/images/client.jpg" icon={faUser} title="Ajouter un client" description="Ajoutez un clien afin de générer une carte" link="newcustomer" />
                        <NavigationCard src="/images/merchant2.jpg" icon={faAddressCard} title="Créez une carte" description="Créez une carte à partir d'un client enregistré" link="newcard" />
                    </div>
                    <div className={styles.cardContainer} >
                        <NavigationCard src="/images/scan.jpg" icon={faQrcode} title="Scanner une carte" description="Scannez une carte avec votre appareil photo" link="" />
                        <NavigationCard src="/images/gestion.jpg" icon={faGear} title="Gestion des cartes" description="Historique et montants générés de vos cartes" link="" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

