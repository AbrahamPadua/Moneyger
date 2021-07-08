import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import auth from "../../auth/authProvider";
import transactionProvider from "../../auth/transactionProvider";
import categoryProvider from "../../auth/categoryProvider";
import Dashboard from "../../components/Dashboard/Dashboard";
import Styles from "../../styles/Transaction.module.scss";
import Link from "next/link";
import moment from "moment";

const index = () => {
  const [transaction, setTransaction] = useState({});
  const [category, setCategory] = useState({
    icon: "ban",
    iconColor: "red",
  });
  const [render, setRender] = useState(false);

  useEffect(async () => {
    await auth.checkAuth();
    const { id } = Router.query;
    const data = await transactionProvider.getTransaction(id);
    const categData = await categoryProvider.getCategories();
    if (data) setTransaction(data);
    if (categData) {
      setCategory(categData.find((x) => x.name === data.current.categoryName));
    }
  }, [render]);

  return (
    <Dashboard title={"Transaction"}>
      <div className={Styles.transaction}>
        <section className={Styles.details}>
          <div
            className={Styles.category}
            style={{ backgroundColor: category.iconColor }}
          >
            <FontAwesomeIcon icon={["fas", category.icon]} />
          </div>
          <div>
            <h2>Category: </h2>
            {transaction.current ? transaction.current.categoryName : ""}
          </div>
          <div>
            <h2>Date:</h2>
            {transaction.current ? moment(transaction.current.dateAdded).format("MMMM DD, YYYY") : ""}
          </div>
          <div>
            <h2>Amount:</h2>
            {transaction.current ? transaction.current.amount : ""}
          </div>
          <div>
            <h2>Description:</h2>
            {transaction.current ? transaction.current.description : ""}
          </div>
          <div>
            <h2>Balance After Transaction:</h2>
            {transaction.current ? transaction.current.balanceAfterTransaction : ""}
          </div>
        </section>
        <section className={Styles.buttons}>
          <Link
            href={`/transaction?id=${transaction.prev ? transaction.prev._id : ""
              }`}
          >
            <a>
              <button
                type="button"
                className={Styles.button}
                style={transaction.prev ? {} : { display: "none" }}
                onClick={() => setRender(!render)}
              >
                prev
              </button>
            </a>
          </Link>
          <Link
            href={`/transaction?id=${transaction.next ? transaction.next._id : ""
              }`}
          >
            <a>
              <button
                type="button"
                className={Styles.button}
                style={transaction.next ? {} : { display: "none" }}
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
