import React from "react";
import styles from "../styles/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode, faAddressCard, faGear, faUser, faArrowRightFromBracket, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeUserFromStore } from '../reducers/user'
import Image from "next/image";

export default function Navbar({ status, href }) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    // En cas de scroll vers le bas cacher la navbar
    if (window.scrollY > 40) {
      setShow(false);
      // En cas de scroll vers le haut afficher la navbar
    } else {
      setShow(true);
    }
    // Mémoriser la position actuel pour l'utiliser dans le prochain scroll
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    // Supprime l'écouteur d'événement
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div className={`${styles.navbar} ${!show && styles.hidden}`}>
      <Link href='/home'>
      <div className={styles.logo}>
        <FontAwesomeIcon icon={faQrcode} width="30" height="30" color="#333e63" />
        <div> QRify</div>
        </div>
      </Link>
      {status === 'avatar' ? <Avatar /> : (
        <Link href={href} >
          <div className={styles.btn}>
            <button className={styles.btnLogin}>
              {status}
            </button>
          </div>
        </Link>
      )}
    </div>
  );
}

const Avatar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Image
        alt="avatar"
        width={40}
        height={40}
        src="/image/avatar2.svg"
        className={styles.avatar}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />
      {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
    </>
  )
}

const Menu = ({ setIsMenuOpen }) => {
  const menuData = [
    { title: 'Menu', icon: faHouse, href: '/home' },
    { title: 'Profile', icon: faGear, href: '/' },
    { title: 'Ajout client', icon: faUser, href: '/newcustomer' },
    { title: 'Carte', icon: faAddressCard, href: '/newcard' },
    { title: 'Scan', icon: faQrcode, href: '/' },
    { title: 'Déconnexion', icon: faArrowRightFromBracket, href: '/' }
  ]

  return (
    <div className={styles.navbar_menu} >
      {menuData.map((el, i) => {
        return <MenuElement key={i} title={el.title} icon={el.icon} href={el.href} setIsMenuOpen={setIsMenuOpen} />
      })}
    </div >
  )
}

const MenuElement = ({ title, icon, href, setIsMenuOpen }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    setIsMenuOpen(false)
    if (title === 'Déconnexion') {
      dispatch(removeUserFromStore())
    }
  }

  return (
    <div className={styles.navbar_item} >
      <Link href={href} onClick={handleClick}>
        <FontAwesomeIcon icon={icon} width="30" height="30" color="#333e63" />
        {title}
      </Link>
    </div>
  )
}