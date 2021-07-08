// FUNCTIONS
import { useEffect, useState } from "react";
import transactions from "../../auth/transactionProvider";
import quoteProvider from "../../auth/quoteProvider";
import auth from "../../auth/authProvider";
import _ from "lodash";
// COMPONENTS
import Dashboard from "../../components/Dashboard/Dashboard";
import Pixel from "../../components/Dashboard/Pixel";
import Transactions from "../../components/Dashboard/Transactions";
// STYLING
import Styles from "../../styles/Dashboard.module.scss";
import DashboardTitle from "../../components/Dashboard/DashboardTitle";
// CONTEXTS
import { DashData } from "../../Contexts";

const index = () => {
  const [pixels, setPixels] = useState([[], [], [], [], [], [], []]);
  const [quote, setQuote] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [pixelDate, setPixelDate] = useState("");

  useEffect(async () => {
    await auth.checkAuth();
    const data = await transactions.getTransactions();
    const quoteData = await quoteProvider.getQuote();
    if (quoteData) setQuote(quoteData);

    // Setting up the pixels table
    let table;
    if (data) {
      table = createTable(data);
      if (data.length) setCurrentData(data);
    } else {
      table = createTable();
    }
    setPixels(table);
  }, []);

  return (
    <DashData.Provider value={{ currentData, quote, pixelDate, setPixelDate }}>
      <Dashboard title="Home">
        <div className={Styles.home}>
          <DashboardTitle />
          <section className={Styles.statSection}>
            <div className={Styles.tableData}>
              <ul className={Styles.weekdays}>
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
              </ul>
              <div className={Styles.pixelsTable}>
                {pixels}
                <ul className={Styles.pixelLegends}>
                  <li>No Change</li>
                  <li className={Styles.gain}>Gain</li>
                  <li className={Styles.loss}>Loss</li>
                </ul>
              </div>
            </div>
            <div className={Styles.details}>
              <h1>Transactions</h1>
              <Transactions />
            </div>
          </section>
        </div>
      </Dashboard>
    </DashData.Provider>
  );
};

const createTable = (data) => {
  const WEEKS = 52;
  const table = [[], [], [], [], [], [], []];
  let date = new Date();
  let today = new Date(date);

  // Iterate through each week
  for (let i = 0; i < WEEKS; i++) {
    if (date.toDateString() === today.toDateString()) {
      for (let j = today.getDay(); j >= 0; j--) {
        const newPixel = createPixel(data, date);
        table[j].unshift(newPixel);
        date.setDate(date.getDate() - 1);
      }
    } else {
      for (let j = 6; j >= 0; j--) {
        const newPixel = createPixel(data, date);
        table[j].unshift(newPixel);
        date.setDate(date.getDate() - 1);
      }
    }
  }

  return table.map((row) => (
    <div key={Math.random()} className={Styles.pixelsRow}>
      {row}
    </div>
  ));
};

const createPixel = (data, date) => {
  let newDate = new Date(date.toDateString());
  let amount = 0;
  let numOfTransactions = 0;
  if (data) {
    // Get the transaction on the current date
    let onDateTransacts = data.filter((transact) => {
      let transactDate = new Date(transact.dateAdded).toDateString();
      return new Date(transactDate).getTime() == newDate.getTime();
    });
    if (onDateTransacts.length) {
      // Increment the amount on
      onDateTransacts.forEach((transact) => {
        amount =
          transact.type.toLowerCase() == "income"
            ? amount + transact.amount
            : amount - transact.amount;
      });
      numOfTransactions = onDateTransacts.length;
    }
  }

  return (
    <Pixel
      key={newDate.getTime()}
      date={newDate}
      amount={amount}
      numOfTransactions={numOfTransactions}
    ></Pixel>
  );
};

export default index;
