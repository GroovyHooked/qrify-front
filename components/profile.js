import { useEffect, useState } from 'react';
import styles from '../styles/profile.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { changeAvatarPath } from '../reducers/user.js'
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Avatar } from '../components/navbar.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'
import { addUserToStore } from '../reducers/user.js'

export function Profile() {
    const user = useSelector((state) => state.user.value)
    console.log({ user });

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userData, setUserData] = useState({});

    return (
        <>
            <Navbar status="avatar" />
            <div className={styles.profile_page}>
                {isModalOpen && <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
                <div className={styles.profile_info}>
                    <Avatar width={100} height={100} />
                    <h2>{user.firstname} {user.lastname}</h2>
                    <p>{user.email}</p>
                    <button
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        type='submit'
                        className={styles.button}>Editer profil</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

const Modal = ({ isModalOpen, setIsModalOpen }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)
    const [inputEmail, setInputEmail] = useState('')
    const [updateMessage, setUpdateMessage] = useState('')

    const updateUserEmailInDb = async () => {
        if (!inputEmail) {
            setUpdateMessage("Veuillez remplir le champ")
            return
        }
        const res = await fetch(`http://localhost:3000/users/updateemail`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: inputEmail, token: user.token })
        })
        const updateResult = await res.json()
        if (updateResult.result) {
            dispatch(addUserToStore({ ...user, email: inputEmail }))
            setUpdateMessage("L'email s'est bien mis à jour")

        } else {
            setUpdateMessage("Un problème est survenu lors de la mise à jour")
        }
    }

    return (
        <div className={styles.modal_container}>
            <button
                onClick={() => setIsModalOpen(!isModalOpen)}
                type='submit' className={styles.close_button}>
                <FontAwesomeIcon
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    icon={faXmark}
                    size='lg'
                    className={styles.modal_icon} />

            </button>
            <p className={styles.modal_title}>Choisissez votre avatar</p>
            <div className={styles.select_avatar}>
                <AvatarSelection />
            </div>
            <div className={styles.update_email}>
                <p>Modifiez votre adresse email</p>
                <div style={{ color: '#333e63', fontSize: '14px' }}>{updateMessage && updateMessage}</div>
                <input
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className={styles.mail_input}
                    type='text'
                    placeholder='Modifiez votre email' />
                <button
                    onClick={updateUserEmailInDb}
                    className={styles.modal_button}
                    type='submit'>Modifier l'email</button>
            </div>
        </div>
    )
}

const AvatarSelection = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)

    const avatars = [
        { id: 'avatar1', src: '/avatars/avatar1.svg', alt: 'Avatar 1', value: 'avatar1' },
        { id: 'avatar2', src: '/avatars/avatar2.svg', alt: 'Avatar 2', value: 'avatar2' },
        { id: 'avatar3', src: '/avatars/avatar3.svg', alt: 'Avatar 3', value: 'avatar3' },
        { id: 'avatar4', src: '/avatars/avatar4.svg', alt: 'Avatar 4', value: 'avatar4' },
        { id: 'avatar5', src: '/avatars/avatar5.svg', alt: 'Avatar 5', value: 'avatar5' },
        { id: 'avatar6', src: '/avatars/avatar6.svg', alt: 'Avatar 6', value: 'avatar6' },
        { id: 'avatar7', src: '/avatars/avatar7.svg', alt: 'Avatar 7', value: 'avatar7' },
        { id: 'avatar8', src: '/avatars/avatar8.svg', alt: 'Avatar 8', value: 'avatar8' }
    ];

    const changeAvatarPathInStore = async (path) => {
        console.log({ path });

        const res = await fetch('http://localhost:3000/users/avatarupdate', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatarPath: path, token: user.token })
        })
        const updateResult = await res.json()

        if (updateResult.result) {
            dispatch(changeAvatarPath(path));
        }
    }

    return (
        <div className={styles.avatar_selection}>
            {avatars.map(avatar => (
                <label key={avatar.id} htmlFor={avatar.id}>
                    <Image src={avatar.src} alt={avatar.alt} className={styles.avatarImage} width={50} height={50} />
                    <input type="radio" id={avatar.id} name="avatar" value={avatar.value} className={styles.avatarRadio} onChange={() => changeAvatarPathInStore(`/avatars/${avatar.id}.svg`)} />
                </label>
            ))}
        </div>
    );
}


export default Profile
