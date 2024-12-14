import styles from '../styles/navigationCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';
import Image from 'next/image';


export default function NavigationCard({ src, title, description, icon, link }) {

    return (
        <Link href={link} >
        <div className={styles.card_container}>
            <div className={styles.innerdiv}>
                <div className={styles.overlay} ></div>
                    <Image
                        height={78}
                        width={110}
                        alt='section description'
                        src={src}
                        className={styles.image} />
                <FontAwesomeIcon icon={icon} className={styles.icon} />
            </div>
            <div className={styles.description}>
                    <p className={styles.card_title}>{title}</p>
                    <p className={styles.card_info}>{description}</p>
            </div>

            </div>
        </Link>
    )
};

