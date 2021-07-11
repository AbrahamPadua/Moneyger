// FUNCTIONS
import { useEffect, useState } from "react";
import transactionProvider from "../../providers/transactionProvider";
import categoryProvider from "../../providers/categoryProvider";
import auth from "../../providers/authProvider";
import _ from "lodash";
// COMPONENTS
import Link from "next/link";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import Dashboard from "../../components/Dashboard/Dashboard";
import TransactTable from "../../components/TransactTable";
// STYLING
import Styles from "../../styles/Transaction.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// # of Transactions to show per page
const nShow = 5;

const Transactions = () => {
  const [type, setType] = useState("All");
  const [allTs, setAllTs] = useState([]);
  const [nPage, setNPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [shownData, setShowData] = useState([]);

  useEffect(async () => {
    // Fetching all the necessary data
    await auth.checkAuth();
    // const { page } = Router.query;
    // if (page) setNPage(page);
    const data = await transactionProvider.getTransactions()
    if (data) setAllTs(data)
  }, []);

  useEffect(() => {
    if (allTs) {
      setMaxPage(Math.floor((allTs.length - 1) / nShow) + 1);

      // Copy transacts then
      const transacts = allTs
        .slice()
        .reverse()
        .slice((nPage - 1) * nShow, nPage * nShow);
      const records = transacts.map((transaction) => {
        if (
          type === "All" ||
          transaction.category.type.toLowerCase() === type.toLowerCase()
        ) {
          return (
            <TransactTable
              key={transaction.id}
              {...transaction}
            />
          );
        }
      });
      setShowData(records);
    }
  }, [allTs, type, nPage]);

  return (
    <Dashboard title="Transactions">
      <h3>Transactions</h3>
      <InputGroup className="mb-2">
        <FormControl placeholder="Search Record" />
        <Form.Control
          as="select"
          defaultValue="All"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </Form.Control>
      </InputGroup>
      <table className={Styles.transactions}>
        <thead>
          <tr>
            <th></th>
            <th>Amount</th>
            <th>Description</th>
            <th>Balance After</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{shownData}</tbody>
      </table>
      <h6 className={Styles.pageLabel}>page</h6>
      <ul className={Styles.pages}>
        {maxPage > 1 ? (
          <>
            {nPage > 1 ? (
              <button onClick={() => setNPage(nPage - 1)}>&lt;</button>
            ) : (
              <button disabled>&lt;</button>
            )}
            <li onClick={() => setNPage(1)}>{nPage}</li>
            <li onClick={() => setNPage(2)}>{nPage + 1}</li>
            <li onClick={() => setNPage(3)}>{nPage + 2}</li>
            <li onClick={() => console.log(maxPage, nPage)}>Log</li>
            {nPage === maxPage ? (
              <button disabled>&gt;</button>
            ) : (
              <button onClick={() => setNPage(nPage + 1)}>&gt;</button>
            )}
          </>
        ) : (
          <li>{nPage}</li>
        )}
      </ul>
      <Link href="/transactions/new">
        <div className={Styles.addButton}>
          <a>
            <FontAwesomeIcon icon={["fas", "plus"]} />
          </a>
        </div>
      </Link>
    </Dashboard>
  );
};

export default Transactions;
