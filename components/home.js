import NavigationCard from './navigationCard'
import Navbar from '../components/navbar'
import styles from '../styles/home.module.css'
import Footer from '../components/footer'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import { useEffect } from 'react'
import { redirectUserIfNotConnected } from '../utils/utils'

import { faQrcode, faAddressCard, faGear, faUser } from '@fortawesome/free-solid-svg-icons';

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
                <h2 className={styles.title}>Gérez vos cartes cadeaux en quelques clics</h2>
                <div className={styles.innerContainer} >
                    <NavigationCard src="/images/client.jpg" icon={faUser} description="Ajouter un client" link="newcustomer" />
                    <NavigationCard src="/images/merchant2.jpg" icon={faAddressCard} description="Créez une carte" link="newcard" />
                </div>
                <div className={styles.innerContainer} >
                    <NavigationCard src="/images/scan.jpg" icon={faQrcode} description="Scanner une carte" link="" />
                    <NavigationCard src="/images/gestion.jpg" icon={faGear} description="Gestion des cartes" link="" />
                </div>
            </div>
            <Footer />
        </>
    )
};

