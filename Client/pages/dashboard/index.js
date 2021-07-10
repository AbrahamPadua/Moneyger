// FUNCTIONS
import { useEffect, useState } from "react";
import transactions from "../../providers/transactionProvider";
import pixel from "../../providers/pixelProvider";
import auth from "../../providers/authProvider";
import _ from "lodash";
// COMPONENTS
import Dashboard from "../../components/Dashboard/Dashboard";
import Pixel from "../../components/Dashboard/Pixel";
import Transactions from "../../components/Dashboard/Transactions";
import Weekdays from "../../components/Dashboard/Weekdays";
// STYLING
import Styles from "../../styles/Dashboard.module.scss";
import DashboardTitle from "../../components/Dashboard/DashboardTitle";
// CONTEXTS
import { DashData } from "../../Contexts";
import client from "../../graphql/client";
import LOAD_USERS from "../../graphql/Queries";

const index = ({ quote }) => {
  const [pixels, setPixels] = useState([[], [], [], [], [], [], []]);
  const [currentData, setCurrentData] = useState([]);
  const [pixelDate, setPixelDate] = useState("");

  useEffect(async () => {
    await auth.checkAuth();
    const data = await transactions.getTransactions();

    // Setting up the pixels table
    let table;
    if (data) {
      table = pixel.createTable(data);
      if (data.length) setCurrentData(data);
    } else {
      table = pixel.createTable();
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
              <Weekdays />
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

export const getServerSideProps = async () => {
  const { loading, error, data } = await client.query({ query: LOAD_USERS })
  if (error) {
    console.log(error)
    return { props: { quote: null } }
  }
  if (!loading) return { props: { quote: data.getQuote } }
  return { props: { quote: null } }
}

export default index;
