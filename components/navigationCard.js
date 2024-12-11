import styles from '../styles/navigationCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';


export default function NavigationCard({ src, description, icon, link }) {

    return (
        <Link href={link} >
        <div className={styles.card_container}>
            <div className={styles.innerdiv}>
                <div className={styles.overlay} ></div>
                <img src={src} className={styles.image} />
                <FontAwesomeIcon icon={icon} className={styles.icon} />
            </div>
            <div className={styles.description}>
                <p>{description}</p>
            </div>

            </div>
        </Link>
    )
};

