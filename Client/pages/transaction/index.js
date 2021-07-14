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
  const [prevT, setPrevT] = useState(null)
  const [currT, setCurrT] = useState(null);
  const [nextT, setNextT] = useState(null)
  const [render, setRender] = useState(false);

  useEffect(async () => {
    await auth.checkAuth();
    const { id } = Router.query;
    const data = await transactionProvider.getTransaction(id);
    if (data) {
      console.log(data)
      switch (data.length) {
        case 1:
          setCurrT(data[0])
          break
        case 2:
          if (data[0].id === id) {
            setCurrT(data[0])
            setNextT(data[1])
            setPrevT(null)
          } else {
            setPrevT(data[0])
            setCurrT(data[1])
            setNextT(null)
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
            style={{ backgroundColor: currT ? currT.category.icon.color : "red" }}
          >
            <FontAwesomeIcon icon={["fas", currT ? currT.category.icon.name : "ban"]} />
          </div>
          <div>
            <h2>Category: </h2>
            {currT ? currT.category.name : ""}
          </div>
          <div>
            <h2>Date:</h2>
            {currT ? dayjs(currT.dateAdded).format("MMMM DD, YYYY") : ""}
          </div>
          <div>
            <h2>Amount:</h2>
            {currT ? currT.amount : ""}
          </div>
          <div>
            <h2>Description:</h2>
            {currT ? currT.description : ""}
          </div>
          <div>
            <h2>Balance After Transaction:</h2>
            {currT ? currT.balanceAfterTransaction : ""}
          </div>
        </section>
        <section className={Styles.buttons}>
          <Link
            href={`/transaction?id=${prevT ? prevT.id : ""
              }`}
          >
            <a>
              <button
                type="button"
                className={Styles.button}
                style={prevT ? {} : { display: "none" }}
                onClick={() => setRender(!render)}
              >
                prev
              </button>
            </a>
          </Link>
          <Link
            href={`/transaction?id=${nextT ? nextT.id : ""}`}
          >
            <a>
              <button
                type="button"
                className={Styles.button}
                style={nextT ? {} : { display: "none" }}
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
