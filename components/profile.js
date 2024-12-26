import { useEffect, useState } from 'react';
import styles from '../styles/profile.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { changeAvatarPath, updateBackgroundColor, updateMainColor } from '../reducers/user.js'
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Avatar } from '../components/navbar.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'
import { addUserToStore } from '../reducers/user.js'
import { BASE_URL } from '../utils/utils';

export function Profile() {
    const user = useSelector((state) => state.user.value)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Navbar status="avatar" />
            <div className={styles.profile_page} style={isModalOpen ? { paddingBottom: '450px' } : {}}>
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
    const [backendResponse, setBackendResponse] = useState('')

    // Fonction de mise à jour de l'email
    const updateUserEmailInDb = async () => {
        // Si la variable d'état qui sert à stocker le mail est vide, on sort de la fonction
        if (!inputEmail) {
            setBackendResponse("Veuillez remplir le champ")
            return
        }
        // Requête vers le backend pour mettre à jour l'email
        const res = await fetch(`${BASE_URL}/users/updateemail`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: inputEmail, token: user.token })
        })

        const updateResult = await res.json()
        // Si la mise à jour côté backend a bien eu lieu, on met à jour l'email dans le store
        if (updateResult.result) {
            dispatch(addUserToStore({ ...user, email: inputEmail }))
            setBackendResponse("L'email s'est bien mis à jour")

        } else {
            setBackendResponse("Un problème est survenu lors de la mise à jour")
        }
    }

    // Fonction de mise à jour des couleurs du code QR 
    const updateQrCodeColors = async ({ color, type, token }) => {
        // Requête vers le backend pour mettre à jour une couleur
        const response = await fetch(`${BASE_URL}/users/updatecolors`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ color, type, token })
        })
        // Si la mise à jour côté backend a bien eu lieu, on met à jour la couleur dans le store
        if (response.ok) {
            type === 'main' ? dispatch(updateMainColor(color)) : dispatch(updateBackgroundColor(color))
        } else {
            // Sinon on affiche l'erreur
            const data = response.json()
            setBackendResponse(data.error)
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
            <div style={{ color: '#333e63', fontSize: '14px', position: 'absolute', top: '22px' }}>{backendResponse && backendResponse}</div>
            <div className={styles.avatar_container}>
                <p className={styles.modal_title}>Choisissez votre avatar</p>
                <div className={styles.select_avatar}>
                    <AvatarSelection setBackendResponse={setBackendResponse} />
                </div>
            </div>
            <div className={styles.update_email}>
                <p>Modifiez votre adresse email</p>

                <input
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    className={styles.mail_input}
                    type='text'
                    placeholder='local@domain.top' />
                <button
                    onClick={updateUserEmailInDb}
                    className={styles.modal_button}
                    type='submit'>Modifier l'email</button>
            </div>
            <div className={styles.qrcode_color_container}>
                <p>Personnalisez les couleurs du code QR</p>
                <div className={styles.qrcode_colors_display}>
                    <div className={styles.qrcode_colors_display_wrapper}>
                        <p>Couleur principale</p>
                        <div className={styles.main_color} style={{ backgroundColor: `${user.qrCodeMainColor}` }}>
                            <input
                                value={user.qrCodeMainColor}
                                onChange={(e) => updateQrCodeColors({ color: e.target.value, type: 'main', token: user.token })}
                                className={styles.qrcode_color_input}
                                type='color'
                            />
                        </div>
                    </div>
                    <div className={styles.qrcode_colors_display_wrapper}>
                        <p>Couleur de fond</p>
                        <div className={styles.background_color} style={{ backgroundColor: `${user.qrCodeBackgroundColor}`, borderColor: user.qrCodeBackgroundColor }}>
                            <input
                                value={user.qrCodeBackgroundColor}
                                onChange={(e) => updateQrCodeColors({ color: e.target.value, type: 'background', token: user.token })}
                                className={styles.qrcode_color_input}
                                type='color'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AvatarSelection = ({ setBackendResponse }) => {
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
        const res = await fetch(`${BASE_URL}/users/avatarupdate`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ avatarPath: path, token: user.token })
        })

        if (res.ok) {
            dispatch(changeAvatarPath(path));
        } else {
            const data = res.json()
            setBackendResponse(data.error)
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
