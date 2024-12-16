import styles from "../styles/Signin.module.css";
import Link from "next/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserToStore } from '../reducers/user'
import { useRouter } from 'next/router'
import { BASE_URL } from '../utils/utils';

function SignIn() {
  const dispatch = useDispatch()
  const router = useRouter();

  const { userCrendentials } = router.query;
  const userCrendentialsObj = userCrendentials ? JSON.parse(userCrendentials) : null;

  const [signInMail, setSignInMail] = useState(userCrendentialsObj ? userCrendentialsObj.email : '');
  const [signInPassword, setSignInPassword] = useState(userCrendentialsObj ? userCrendentialsObj.password : '');

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
    .then((data) => {
      console.log({data});
        if (data.result) {
          dispatch(addUserToStore({ email: data.email, token: data.token, firstname: data.firstname }))
          setSignInMail("");
          setSignInPassword("");
          router.push('/home')
        }
      });
  };

  return (
    <>
      <Navbar status='Inscription' href="/signup" />
      <div className={styles.container}>
        <div className={styles.containerglobal}>
          <div className={styles.containertitle}>
            <div className={styles.title}>Connexion</div>
          </div>
          <div className={styles.containerImgForm}>
            <div className={styles.containerImage}></div>
            <div className={styles.containerForm}>
              <div className={styles.error}></div>
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
                    placeholder="*********"
                    onChange={(e) => setSignInPassword(e.target.value)}
                    value={signInPassword}
                    className={styles.input}
                  />
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
