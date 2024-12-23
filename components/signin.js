import styles from "../styles/Signin.module.css";
import Link from "next/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserToStore } from '../reducers/user'
import { useRouter } from 'next/router'
import { BASE_URL } from '../utils/utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faEye
} from "@fortawesome/free-solid-svg-icons";

function SignIn() {
  const dispatch = useDispatch()
  const router = useRouter();

  const { userCrendentials } = router.query;
  const userCrendentialsObj = userCrendentials ? JSON.parse(userCrendentials) : null;

  const [signInMail, setSignInMail] = useState(userCrendentialsObj ? userCrendentialsObj.email : '');
  const [signInPassword, setSignInPassword] = useState(userCrendentialsObj ? userCrendentialsObj.password : '');
  const [passwordInputState, setPasswordInputState] = useState({ type: 'password', icon: faEye });
  const [messageError, setMessageError] = useState("");

  const handleSignIn = () => {
    fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInMail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log({ data });

        if (data.result) {
          dispatch(addUserToStore({
            email: data.email,
            token: data.token,
            firstname: data.firstname,
            avatar: data.avatarPath ? data.avatarPath : '/avatars/avatar1.svg',
            lastname: data.lastname,
            qrCodeMainColor: data.qrCodeMainColor,
            qrCodeBackgroundColor: data.qrCodeBackgroundColor
          }))
          router.push('/home')
        } else {
          setMessageError(data.error)
        }
      });
  };

  const switchInputPasswordState = () => {
    if (passwordInputState.type === 'password') {
      setPasswordInputState(current => ({ ...current, type: 'text', icon: faEyeSlash }))
    } else {
      setPasswordInputState(current => ({ ...current, type: 'password', icon: faEye }))
    }
  }

  return (
    <>
      <Navbar status='Inscription' href="/signup" />
      <div className={styles.container}>
        <div className={styles.containerglobal}>
          <div className={styles.containerImgForm}>
            <div className={styles.containerImage}></div>
            <div className={styles.containerForm}>
              <div className={styles.containertitle}>
                <div className={styles.title}>Connexion</div>
              </div>
              <div className={styles.error}>{messageError && messageError}</div>
              <div className={styles.registerSection}>
                <div className={styles.inputgroup}>
                  <label className={styles.text}>Adresse e-mail</label>
                  <input
                    type="email"
                    placeholder="test@gmail.com"
                    onChange={(e) => setSignInMail(e.target.value)}
                    value={signInMail}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputgroup}>
                  <label className={styles.text}>Mot de passe</label>
                  <input
                    type={passwordInputState.type}
                    placeholder="*********"
                    onChange={(e) => setSignInPassword(e.target.value)}
                    value={signInPassword}
                    className={styles.input}
                  />
                  <FontAwesomeIcon
                    onClick={switchInputPasswordState}
                    icon={passwordInputState.icon}
                    style={{
                      position: 'absolute',
                      top: '25px',
                      right: '12px',
                    }} />
                </div>
                <button
                  className={styles.button}
                  id="signIn"
                  onClick={handleSignIn}
                >
                  Connexion
                </button>
              </div>
              <div className={styles.containerBottomText}>
                <div className={styles.textlien}>
                  Connectez-vous ou{" "}
                  <Link href="/signup" className={styles.lien}>
                    créez un compte
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
