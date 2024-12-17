import React from "react";
import styles from "../styles/listCustomers.module.css";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addCustomerToStore } from '../reducers/data'
import { useDispatch } from "react-redux";
import UserProgress from '../components/userProgress'
import { updateProgress } from "../reducers/user";

export default function ListCustomers() {
  const dispatch = useDispatch()
  const router = useRouter();

  const [searchName, setSearchName] = useState("");
  const [listCustomers, setListCustomers] = useState([]);
  const [messageError, setMessageError] = useState("");


  const handleSearch = () => {
    // console.log("test", searchName);

    fetch("http://localhost:3000/customers/onecustomer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastname: searchName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setListCustomers([data.customers]);
        } else {
          setMessageError(data.message);
        }
      });
  };

  useEffect(() => {
    if (!searchName) {
      fetch("http://localhost:3000/customers/list")
        .then((response) => response.json())
        .then((data) => {
          console.log({ data });

          if (data.result) {
            setListCustomers(data.customers);
          }
        });
    }
  }, [searchName]);

  const customers = listCustomers.map((data, i) => {
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
              onClick={async () => {
                const res = await fetch('http://localhost:3000/customers/onecustomer', {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    lastname: data.lastname,
                  })
                })
                const dataFromBack = await res.json()
                dispatch(addCustomerToStore(dataFromBack.customers))
                router.push("/newcard")
              }}
            />
          </button>
        </div>
      </div>
    );
  });

  const handleInput = (e) => {
    setMessageError("");
    setSearchName(e.target.value);
  };

  return (
    <>
      <Navbar status="avatar" href="/" />
      <div className={styles.container}>
        <UserProgress progress="1" />
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
                onClick={() => {
                  dispatch(updateProgress('Ajouter un client'))
                  router.push("/newcustomer")
                }}
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
                onChange={(e) => handleInput(e)}
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
          <div className={styles.error}>{messageError && messageError}</div>
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
