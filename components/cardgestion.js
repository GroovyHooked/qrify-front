import { useState, useEffect } from "react";
import styles from "../styles/gestion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { useSelector } from "react-redux";
import { BASE_URL } from '../utils/utils';

export default function CardGestion() {
  const router = useRouter();

  const user = useSelector((state) => state.user.value)

  const [filteredData, setFilteredData] = useState([]);
  const [showUsed, setShowUsed] = useState(true);
  const [showUsing, setShowUsing] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cardTotalValue, setCardTotalValue] = useState(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // useEffect pour écouter les changements de taille d'écran
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Nettoyage de l'événement lors du démontage
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const totalValue = filteredData.reduce(
      (acc, cur) => acc + cur.totalValue,
      0
    );
    setCardTotalValue(totalValue);
  }, [filteredData]);

  useEffect(() => {
    fetch(`${BASE_URL}/card/allcards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DEBUG", { data });

        if (showUsed && !showUsing) {
          data.cards = data.cards.filter((i) => i.remainingValue > 0);
        } else if (!showUsed && showUsing) {
          data.cards = data.cards.filter((i) => i.remainingValue === 0);
        }
        // console.log("debug2", { debug2: data.cards });

        setFilteredData(data.cards);
      })
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, [showUsed, showUsing]);

  const handleButtonClick = (index) => {
    if (index === "used") {
      if (!showUsed) {
        setShowUsed(true);
      } else {
        setShowUsed(false);
        setShowUsing(true);
      }
    } else if (index === "using") {
      if (!showUsing) {
        setShowUsing(true);
      } else {
        setShowUsing(false);
        setShowUsed(true);
      }
    }
  };

  return (
    <>
      <NavBar status="avatar" />

      <div className={styles.container}>
        <div className={styles.containerglobal}>
          <div className={styles.containertitle}>
            <div className={styles.contain}>
              <div className={styles.title}>
                Nom <br />
              </div>
              {windowWidth > 768 && (
                <div className={styles.title}>
                  Email <br />
                </div>
              )}
              <div className={styles.title}>
                Date <br />
              </div>
              <div className={styles.title}>
                Valeur <br />
              </div>
            </div>
            <div className={styles.filter}>
              <button
                onClick={() => handleButtonClick("used")}
                style={{
                  marginRight: "10px",
                  backgroundColor: showUsed ? "#6a7caa" : "transparent",
                  color: showUsed ? "white" : "#6a7caa",
                  cursor: "pointer",
                }}
                className={styles.button}
              >
                Utilisée
              </button>
              <button
                onClick={() => handleButtonClick("using")}
                style={{
                  backgroundColor: showUsing ? "#6a7caa" : "transparent",
                  color: showUsing ? "white" : "#6a7caa",
                  cursor: "pointer",
                }}
                className={styles.button}
              >
                En cours
              </button>
            </div>
          </div>

          <div className={styles.containercontent}>
            {filteredData.map((data, index) => (
              <div key={index} className={styles.ligne}>
                <div className={styles.contain}>
                  <div className={styles.undercontain}>
                    <div className={styles.espacement}>
                      <div className={styles.text}>
                        {data.customerId.firstname} <br />
                        {data.customerId.lastname}
                      </div>
                    </div>
                    <div>
                      {windowWidth > 768 && (
                        <div className={styles.text}>
                          {data.customerId.email}
                        </div>
                      )}
                    </div>
                    <div className={styles.espacement}>
                      <div className={styles.text}>
                        {new Date(data.date).toLocaleDateString()} <br />
                        {new Date(data.date).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className={styles.espacement}>
                      <div className={styles.text}>{data.totalValue} €</div>
                    </div>
                  </div>
                </div>
                <div className={styles.rightcontain}>
                  <FontAwesomeIcon
                    icon={faCircle}
                    color={data.remainingValue === 0 ? "red" : "green"}
                  />
                  <div className={styles.buttonEye}>
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{
                        width: "25",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (data._id) {
                          router.push({
                            pathname: "/validationcard",
                            query: { cardId: data._id },
                          });
                        } else {
                          console.error("cardId is undefined");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.containertotal}>
            Total cartes : {cardTotalValue} €
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
