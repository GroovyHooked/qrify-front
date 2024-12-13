import React from "react";
import styles from "../styles/listCustomers.module.css";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function ListCustomers() {
  const [searchName, setSearchName] = useState("");
  const [listCustomers, setListCustomers] = useState([]);

  const handleSearch = () => {
    console.log("test", searchName);

    fetch("http://localhost:3000/customers/onecustomer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: searchName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });

        if (data.result) {
          setSearchName(data);
        } else {
          setMessageError(data.error);
        }
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/customers/list")
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });

        if (data.result) {
          setListCustomers(data.customers);
        } else {
          setMessageError(data.error);
        }
      });
  }, []);
  console.log("listcustomers is", listCustomers);

  const customers = listCustomers.map((data, i) => {
    console.log("map is", data);
    return (
      <div key={i} className={styles.ligne}>
        <div className={styles.text}>{data.firstname}</div>
        <div className={styles.text}>{data.email}</div>
        <div className={styles.text}>{data.phoneNumber}</div>
        <div>
          <button className={styles.buttonSelect}>
            <FontAwesomeIcon
              icon={faPlus}
              size={"30"}
              color="#333e63"
              onClick={() => handleSearch()}
            />
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <Navbar status="Inscription" href="/" />
      <div className={styles.container}>
        <div className={styles.containerglobal}>
          <div className={styles.containerDescription}>
            <div className={styles.containerClientDesc}>
              <div className={styles.titleClient}>Client</div>
              <div className={styles.textTitle}>
                Sélectionner un client
                <span className={styles.span}>
                  pour lequel vous souhaitez créer la carte cadeau
                </span>
              </div>
            </div>
            <div className={styles.containerButton}>
              <button
                className={styles.button}
                id="addCustomers"
                onClick={() => handleSignUp()}
              >
                Ajouter un client
              </button>
            </div>
          </div>
          <div className={styles.containerSearch}>
            <div className={styles.containerInput}>
              <input
                className={styles.input}
                type="text"
                placeholder="Nom"
                id="searchName"
                onChange={(e) => setSearchName(e.target.value)}
                value={searchName}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size={"30"}
                color="#333e63"
                onClick={() => handleSearch()}
              />
            </div>
          </div>
          <div className={styles.containertitle}>
            <div className={styles.contain}>
              <div className={styles.title}>Name</div>
              <div className={styles.title}>Email</div>
              <div className={styles.title}>Téléphone</div>
            </div>
          </div>
          <div className={styles.containercontent}>{customers}</div>
          <div className={styles.containertotal}></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
