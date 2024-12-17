import { useState, useEffect } from "react";
import styles from "../styles/gestion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

export default function CardGestion() {
  const [infos, setInfos] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showUsed, setShowUsed] = useState(true);
  const [showUsing, setShowUsing] = useState(true);
  const [cardUser, setCardUser] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/card/allcards")
      .then((response) => response.json())
      .then((data) => {
        console.log("Données reçues :", data);
        setInfos(data || []);
      })
      .catch((error) => console.error("Erreur lors du fetch :", error));
  }, []);

  // const totalValue = infos.reduce((total, item) => total + item.totalValue, 0);

  useEffect(() => {
    fetch("http://localhost:3000/card/allcards")
      .then((response) => response.json())
      .then((data) => {
        console.log("DEBUG", { data });

        if (showUsed && !showUsing) {
          data.cards = data.cards.filter((i) => i.totalValue > 0);
        } else if (!showUsed && showUsing) {
          data.cards = data.cards.filter((i) => i.totalValue === 0);
        }
        console.log("debug2", { data });

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

  useEffect(() => {
    console.log("debug3", { infos, filteredData });
  }, [infos, filteredData]);

  const router = useRouter();

  return (
    <>
      <NavBar status="avatar" />

      <div className={styles.container}>
        <div className={styles.containerglobal}>
          <div className={styles.containertitle}>
            <div className={styles.contain}>
              <div className={styles.title}>
                Name <br />
                <FontAwesomeIcon icon={faSort} width="8" />
              </div>
              <div className={styles.title}>
                Email <br />
                <FontAwesomeIcon icon={faSort} width="8" />
              </div>
              <div className={styles.title}>
                Date <br />
                <FontAwesomeIcon icon={faSort} width="8" />
              </div>
              <div className={styles.title}>
                Valeur <br />
                <FontAwesomeIcon icon={faSort} width="8" />
              </div>
            </div>
            <div className={styles.filter}>
              <button
                onClick={() => handleButtonClick("used")}
                style={{
                  marginRight: "10px",
                  backgroundColor: showUsed ? "#333e63" : "transparent",
                  color: showUsed ? "white" : "#333e63",
                  cursor: "pointer",
                }}
                className={styles.button}
              >
                Utilisée
              </button>
              <button
                onClick={() => handleButtonClick("using")}
                style={{
                  backgroundColor: showUsing ? "#333e63" : "transparent",
                  color: showUsing ? "white" : "#333e63",
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
                    <div className={styles.text}>
                      {data.customerId.firstname} <br />
                      {data.customerId.lastname}
                    </div>
                    <div className={styles.text}>{data.customerId.email}</div>
                    <div className={styles.text}>
                      {new Date(data.date).toLocaleDateString()} <br />
                      {new Date(data.date).toLocaleTimeString()}
                    </div>
                    <div className={styles.text}>{data.totalValue} €</div>
                  </div>
                </div>
                <div className={styles.rightcontain}>
                  <FontAwesomeIcon
                    icon={faCircle}
                    color={data.totalValue === 0 ? "red" : "green"}
                  />
                  <div className={styles.buttonEye}>
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{
                        width: "25",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        router.push({
                          pathname: "/validationcard",
                          query: { cardId: data._id },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.containertotal}>
            {/* Total cartes : {totalValue} € */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
