import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useRouter } from "next/router";
import styles from "../styles/scan.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faRotate } from "@fortawesome/free-solid-svg-icons";

export default function Scan() {

  // État pour gérer l'orientation de la caméra (par défaut, "environment" pour la caméra arrière)
  const [camOrientation, setCamOrientation] = useState("environment");
  const router = useRouter();

  // Références pour le nœud vidéo et l'objet QrScanner
  const videoNodeRef = useRef();
  const qrScannerRef = useRef(null);

  /**
   * Fonction pour changer l'orientation de la caméra
   * 1. Arrête le scanner 
   * 2. inverse l'orientation de la caméra entre "user" et "environment",
   * 3. redémarre le scanner.
   */
  const changeCamOrientation = async () => {
    stopScanner();
    setCamOrientation((current) =>
      current === "user" ? "environment" : "user"
    );
    startScanner();
  };

  /**
   * Fonction pour initialiser et démarrer le scanner QR
   * - Utilise la bibliothèque QrScanner pour décoder les codes QR depuis la caméra.
   * - Définit un callback pour traiter les résultats du scan.
   */
  const startScanner = async () => {

    // Initialisation du scanner avec les options d'orientation de la caméra
    qrScannerRef.current = new QrScanner(
      videoNodeRef.current, // Élément vidéo où le flux de la caméra est affiché
      (result) => {
        console.log("decoded qr code:", result);
        router.push(result.data); // Redirige l'utilisateur vers l'URL contenue dans le QR code
      },
      {
        preferredCamera: camOrientation,
      }
    );
    // Démarrage du scanner
    try {
      await qrScannerRef.current.start();
      console.log("Scanner started successfully.", qrScannerRef.current);
    } catch (error) {
      console.error("Error starting scanner:", error);
    }
  };

  /**
  * Fonction pour arrêter le scanner QR
  * - Arrête le flux vidéo et libère les ressources associées au scanner.
  */
  const stopScanner = async () => {
    if (qrScannerRef.current) {
      await qrScannerRef.current.stop();
      console.log("Scanner stopped successfully.");
    }
  };

  // Démarrage du scanner à chaque fois que le composant est affiché 
  useEffect(() => {
    startScanner();

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <Navbar status="avatar" />
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.heading}>Scannez votre carte</h2>

          <video className={styles.videoNode} ref={videoNodeRef}></video>

          <div className={styles.actions}>
            <button
              className={styles.button}
              onClick={changeCamOrientation}
              type="button"
            >
              <FontAwesomeIcon icon={faRotate} size="2x" color="#ffffff" />
            </button>
            <button
              className={styles.button}
              onClick={startScanner}
              type="button"
            >
              <FontAwesomeIcon icon={faPlay} size="2x" color="#ffffff" />
            </button>
            <button
              className={styles.button}
              onClick={stopScanner}
              type="button"
            >
              <FontAwesomeIcon icon={faStop} size="2x" color="#ffffff" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
