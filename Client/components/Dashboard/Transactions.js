// FUNCTIONS
import { useState, useEffect, useContext } from "react";
import moment from "moment";
// STYLING
import Styles from "../../styles/Dashboard.module.scss";
// CONTEXT
import { DashData } from "../../Contexts";
import dayjs from "dayjs";

const Transactions = () => {
  const { currentData: transactions, pixelDate } = useContext(DashData);
  const [data, setData] = useState(transactions);

  useEffect(() => {
    const Ts = [...transactions]
    if (Ts && Ts.length > 3) {
      setData(Ts.reverse().slice(0, 3));
    } else {
      setData(Ts.sort((T1, T2) => dayjs(T1.dateAdded).isAfter(T2.dateAdded)));
    }
  }, [transactions]);

  useEffect(() => {
    if (pixelDate) {
      const newData = transactions
        .filter((transaction) =>
          moment(pixelDate).isSame(transaction.dateAdded, "day")
        );
      newData.sort((x, y) => (moment(x.dataAdded).isBefore(y.dateAdded, "day")))
      if (newData && newData.length > 3) {
        setData(newData.slice(0, 3));
      } else {
        setData(newData);
      }
    }
  }, [pixelDate]);

  return (
    <>
      <div className={Styles.latestTransactions}>
        {data && data.length ? (
          <>
            <p>
              {pixelDate
                ? <>{moment(pixelDate).format("MMM D, YYYY")} Transactions: </>
                : <>Latest Transactions: </>
              }
            </p>
            {data.map(({ id, description, amount, type }) => {
              return (
                <div
                  key={id}
                  className={Styles.transactionDetail}
                >
                  <span
                    className={
                      type == "Income" ? Styles.income : Styles.expense
                    }
                  >
                    ₱{amount}{" "}
                  </span>
                  <span className={Styles.description}>
                    {description.slice(0, 20)}...
                  </span>
                </div>
              );
            })}
          </>
        ) : (
          <p>
            {pixelDate
              ? <>{moment(pixelDate).format("MMM D, YYYY")} Transactions: </>
              : <>Latest Transactions: </>
            }
            <br />
            <br />
            <i>You have no transactions yet</i>
          </p>
        )}
      </div>
    </>
  );
};

export default Transactions;
