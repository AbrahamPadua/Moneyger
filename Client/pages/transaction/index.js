import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import auth from "../../providers/authProvider";
import transactionProvider from "../../providers/transactionProvider";
import Dashboard from "../../components/Dashboard/Dashboard";
import Styles from "../../styles/Transaction.module.scss";
import Link from "next/link";
import dayjs from "dayjs";

const index = () => {
  const [prevT, setPrevT] = useState({})
  const [currT, setCurrT] = useState({});
  const [nextT, setNextT] = useState({})
  const [render, setRender] = useState(false);

  useEffect(async () => {
    await auth.checkAuth();
    const { id } = Router.query;
    const data = await transactionProvider.getTransaction(id);
    if (data) {
      console.log(data[0])
      switch (data.length) {
        case 1:
          setCurrT(data[0])
          break
        case 2:
          if (data[0].id === id) {
            setCurrT(data[0])
            setNextT(data[1])
          } else {
            setPrevT(data[0])
            setCurrT(data[1])
          }
          break;
        case 3:
          setPrevT(data[0])
          setCurrT(data[1])
          setNextT(data[2])
      }
    };
  }, [render]);

  return (
    <Dashboard title={"Transaction"}>
      <div className={Styles.transaction}>
        <section className={Styles.details}>
          <div
            className={Styles.category}
            style={{ backgroundColor: currT.id ? currT.category.icon.color : "red" }}
          >
            <FontAwesomeIcon icon={["fas", currT.id ? currT.category.icon.name : "ban"]} />
          </div>
          <div>
            <h2>Category: </h2>
            {currT.category ? currT.category.name : ""}
          </div>
          <div>
            <h2>Date:</h2>
            {currT.id ? dayjs(currT.dateAdded).format("MMMM DD, YYYY") : ""}
          </div>
          <div>
            <h2>Amount:</h2>
            {currT.id ? currT.amount : ""}
          </div>
          <div>
            <h2>Description:</h2>
            {currT.id ? currT.description : ""}
          </div>
          <div>
            <h2>Balance After Transaction:</h2>
            {currT.id ? currT.balanceAfterTransaction : ""}
          </div>
        </section>
        <section className={Styles.buttons}>
          <Link
            href={`/transaction?id=${prevT.id ? prevT.id : ""
              }`}
          >
            <a>
              <button
                type="button"
                className={Styles.button}
                style={prevT.id ? {} : { display: "none" }}
                onClick={() => setRender(!render)}
              >
                prev
              </button>
            </a>
          </Link>
          <Link
            href={`/transaction?id=${nextT.id ? nextT.id : ""}`}
          >
            <a>
              <button
                type="button"
                className={Styles.button}
                style={nextT.id ? {} : { display: "none" }}
                onClick={() => setRender(!render)}
              >
                next
              </button>
            </a>
          </Link>
        </section>
      </div>
    </Dashboard>
  );
};

export default index;
