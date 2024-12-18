import { useEffect, useState } from 'react';
import styles from '../styles/profile.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { changeAvatarPath } from '../reducers/user.js'
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { Avatar } from '../components/navbar.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMessage,
    faPrint,
    faEnvelope,
    faHouse,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'

export function Profile() {
    const user = useSelector((state) => state.user.value)
    console.log({ user });

    const [isModalAvatarOpen, setIsModalAvatarOpen] = useState(false)
    const [userData, setUserData] = useState({});

    return (
        <>
            <Navbar status="avatar" />
            <div className={styles.container}>
                <div className={styles.profile_page}>
                    {isModalAvatarOpen && <Modal isModalAvatarOpen={isModalAvatarOpen} setIsModalAvatarOpen={setIsModalAvatarOpen} />}
                    <div className={styles.profile_info}>
                        <Avatar width={100} height={100} />
                        <h2>{user.firstname} {user.lastname}</h2>
                        <p>{user.email}</p>
                        <button
                            onClick={() => setIsModalAvatarOpen(!isModalAvatarOpen)}
                            type='submit'
                            className={styles.button}>Editer profil</button>
                    </div>
                </div>
                <div className={styles.profile_page}>
                    {/* {isModalOpen && <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />} */}
                    <div className={styles.logo_info}>
                        <FontAwesomeIcon
                            size='xl'
                            icon={faHouse}
                           />
                        <button
                            onClick={() => setIsModalAvatarOpen(!isModalAvatarOpen)}
                            type='submit'
                            className={styles.button}>Charger logo</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const Modal = ({ isModalAvatarOpen, setIsModalAvatarOpen }) => {
    return (
        <div className={styles.modal_container}>
            <FontAwesomeIcon
                onClick={() => setIsModalAvatarOpen(!isModalAvatarOpen)}
                icon={faXmark}
                className={styles.modal_icon} />
            <p className={styles.modal_title}>Choisissez votre avatar</p>
            <div className={styles.select_avatar}>
                <AvatarSelection />
            </div>
            <div className={styles.update_email}>
                <p>Modifiez votre addresse email</p>
                <input
                    type='test'
                    placeholder='Modifiez votre email' />
                <button
                    className={styles.modal_button}
                    type='submit'>Modifier</button>
            </div>
            <ImageUploader />
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
        console.log({ updateResult });


        if (updateResult.result) {
            dispatch(changeAvatarPath(path));
        }
    }

    return (
        <div className={styles.avatarSelection}>
            {avatars.map(avatar => (
                <label key={avatar.id} htmlFor={avatar.id}>
                    <Image src={avatar.src} alt={avatar.alt} className={styles.avatarImage} width={50} height={50} />
                    <input type="radio" id={avatar.id} name="avatar" value={avatar.value} className={styles.avatarRadio} onChange={() => changeAvatarPathInStore(`/avatars/${avatar.id}.svg`)} />
                </label>
            ))}
        </div>
    );
}


const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Permet d'afficher un aperçu
        }
    };

    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            <h2 className={styles.upload_logo} >Uploadez un logo</h2>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            {preview && (
                <div style={{ marginTop: "20px" }}>
                    <p>Aperçu de l'image :</p>
                    <img
                        src={preview}
                        alt="Preview"
                        style={{ maxWidth: "300px", maxHeight: "300px" }}
                    />
                </div>
            )}
        </div>
    );
};



export default Profile
