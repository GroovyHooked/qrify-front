import styles from '../styles/userProgress.module.css'
import { useSelector } from 'react-redux'

export default function UserProgress({ progress = 1, action = '' }) {
    const user = useSelector((state) => state.user.value)

    return (
        <div className={styles.progressContainer}>
            <div className={styles.progressbar}>
                <div className={styles.bar1} style={_styles[progress]?.bar1}></div>
                <div className={styles.bar2} style={_styles[progress]?.bar2}></div>
                <div className={styles.circle}>1</div>
                <div className={styles.circle} style={_styles[progress]?.circle2}>2</div>
                <div className={styles.circle} style={_styles[progress]?.circle3}>3</div>
            </div>
            <div className={styles.progressionText}>
                <div className={styles.text}>{user && user.progressString}</div>
                <div className={styles.text} style={_styles[progress]?.text2}>Générer une carte</div>
                <div className={styles.text} style={_styles[progress]?.text3}>Partager la carte</div>
            </div>
        </div>
    )
}

const _styles = {
    1: {
        bar1: {
            backgroundColor: '#ADADAD'
        },
        bar2: {
            backgroundColor: '#ADADAD'
        },
        circle2: {
            color: '#ADADAD',
            border: '1px solid #ADADAD'
        },
        circle3: {
            color: '#ADADAD',
            border: '1px solid #ADADAD'
        },
        text2: {
            color: '#ADADAD',
        },
        text3: {
            color: '#ADADAD',
        }
    },
    2: {
        bar2: {
            backgroundColor: '#ADADAD'
        },
        circle3: {
            color: '#ADADAD',
            border: '1px solid #ADADAD'
        },
        text3: {
            color: '#ADADAD',
        }
    },
    3: {}
}