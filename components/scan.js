import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner'
import { useRouter } from 'next/router'
import styles from '../styles/scan.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faRotate } from '@fortawesome/free-solid-svg-icons';


export default function Scan() {
    const [camOrientation, setCamOrientation] = useState('environment');
    const router = useRouter();
    const videoNodeRef = useRef();
    const qrScannerRef = useRef(null);

    const changeCamOrientation = async () => {
        stopScanner()
        setCamOrientation(current => (current === 'user' ? 'environment' : 'user'));
        startScanner()
       
    };

    const startScanner = async () => {
        qrScannerRef.current = new QrScanner(videoNodeRef.current, result => {
            console.log('decoded qr code:', result);
            router.push(result.data);
        }, {
            preferredCamera: camOrientation
        });

        try {
            await qrScannerRef.current.start();
            console.log('Scanner started successfully.', qrScannerRef.current);
        } catch (error) {
            console.error('Error starting scanner:', error);
        }
    };

    const stopScanner = async () => {
        if (qrScannerRef.current) {
            await qrScannerRef.current.stop();
            console.log('Scanner stopped successfully.');
        }
    };

    useEffect(() => {
        startScanner();

        return () => {
            if (qrScannerRef.current) {
                qrScannerRef.current.destroy();
            }
        };
    }, [camOrientation, router]);

    return (
        <>
            <Navbar status="avatar" />
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <h2 className={styles.heading}>Scannez votre carte</h2>
                    <video
                        className={styles.videoNode}
                        ref={videoNodeRef}
                    ></video>
                    <div className={styles.actions}>
                        <button className={styles.button} onClick={changeCamOrientation} type='button'>
                            <FontAwesomeIcon icon={faRotate} size="2x" color="#ffffff" />
                        </button>
                        <button className={styles.button} onClick={startScanner} type='button'>
                            <FontAwesomeIcon icon={faPlay} size="2x" color="#ffffff" />
                        </button>
                        <button className={styles.button} onClick={stopScanner} type='button'>
                            <FontAwesomeIcon icon={faStop} size="2x" color="#ffffff" />
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}