import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


export default function NavigationCard({ src = "/images/3871744.jpg", description = 'Ceci est une description', icon = faQrcode }) {

    return (
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
    )
};

