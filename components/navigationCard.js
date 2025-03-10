import styles from '../styles/navigationCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from "react-redux";
import { updateProgress } from "../reducers/user";


export default function NavigationCard({ src, title, description, icon, link, progressStatus }) {
    const dispatch = useDispatch();

    // function de mise à jour du status de progression dans le store
    const updateProgressStatus = () => {
        progressStatus && dispatch(updateProgress(progressStatus))
    }

    return (
        <Link href={link} onClick={updateProgressStatus}>
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

