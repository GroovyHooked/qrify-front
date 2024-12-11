import React from "react";
import styles from "../styles/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode, faAddressCard, faGear, faUser, faArrowRightFromBracket, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeUserFromStore } from '../reducers/user'

export default function Navbar({ status, href }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <FontAwesomeIcon icon={faQrcode} width="30" height="30" color="#333e63" />
        <div> QRify</div>
      </div>
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
      <img
        src="image/avatar.png"
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
    { title: 'Ajout client', icon: faUser, href: '/' },
    { title: 'Carte', icon: faAddressCard, href: '/' },
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