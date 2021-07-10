// FUNCTIONS
import { useEffect, useState } from "react";
import transactionProvider from "../../providers/transactionProvider";
import categoryProvider from "../../providers/categoryProvider";
import moment from "moment";
// COMPONENTS
import { Form, Col } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import Dashboard from "../../components/Dashboard/Dashboard";
// STYLING
import Styles from "../../styles/Report.module.scss";
import auth from "../../providers/authProvider";

const CategoryBreakdown = () => {
  const [pieIncome, setPieIncome] = useState("");
  const [pieExpense, setPieExpense] = useState("");
  const [allTransacts, setAllTransacts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredTransacts, setFilteredTransacts] = useState([]);

  useEffect(async () => {
    await auth.checkAuth();
    const data = await transactionProvider.getTransactions();
    const categData = await categoryProvider.getCategories();
    if (data) setAllTransacts(data);
    if (categData) setCategories(categData);
  }, []);

  useEffect(() => {
    if (!filteredTransacts.length) setFilteredTransacts(allTransacts);

    /* SETTING UP THE PIE DATA */

    let income = [];
    let incomeLabels = [];
    let incomeColors = [];

    let expense = [];
    let expenseLabels = [];
    let expenseColors = [];

    // Filtering the data
    let incomeData = filteredTransacts.filter(
      (transaction) => transaction.type === "Income"
    );
    let expenseData = filteredTransacts.filter(
      (transaction) => transaction.type === "Expense"
    );

    // Getting the Income
    for (let transaction of incomeData) {
      let i = incomeLabels.indexOf(transaction.categoryName);
      if (i === -1) {
        incomeLabels.push(transaction.categoryName);
      }
      i = incomeLabels.indexOf(transaction.categoryName);
      // console.log(data);
      if (!income[i]) income[i] = 0;
      income[i] += transaction.amount;
      const categ = categories.find(categ => categ.name == transaction.categoryName)
      incomeColors[i] = categ.iconColor;
    }
    const Income = {
      labels: incomeLabels,
      datasets: [
        {
          data: income,
          backgroundColor: incomeColors,
          // borderColor: [],
          borderWidth: 0,
        },
      ],
    };

    // Getting the expenses
    for (let transaction of expenseData) {
      let i = expenseLabels.indexOf(transaction.categoryName);
      if (i === -1) {
        expenseLabels.push(transaction.categoryName);
      }
      i = expenseLabels.indexOf(transaction.categoryName);
      // console.log(data);
      if (!expense[i]) expense[i] = 0;
      expense[i] += transaction.amount;
      const categ = categories.find(categ => categ.name == transaction.categoryName)
      expenseColors[i] = categ.iconColor;
    }
    const Expense = {
      labels: expenseLabels,
      datasets: [
        {
          data: expense,
          backgroundColor: expenseColors,
          // borderColor: [],
          borderWidth: 0,
        },
      ],
    };
    setPieIncome(Income);
    setPieExpense(Expense);
  }, [filteredTransacts, allTransacts]);

  const handleDate = (e) => {
    if (allTransacts.length) {
      if (e.target.name == "to") {
        const to = e.target.name;
        setFilteredTransacts(
          allTransacts.filter(({ dateAdded }) =>
            moment(dateAdded).isSameOrBefore(to, "day")
          )
        );
      } else {
        const from = e.target.name;
        setFilteredTransacts(
          allTransacts.filter(({ dateAdded }) =>
            moment(dateAdded).isSameOrAfter(from, "day")
          )
        );
      }
    }
  };

  return (
    <Dashboard title="Category Breakdown">
      <section className={Styles.chartMain}>
        <h3>Category Breakdown</h3>
        <Form.Row>
          <Form.Group as={Col} xs="6">
            <Form.Label>From</Form.Label>
            <Form.Control type="date" name="from" onChange={handleDate} />
          </Form.Group>
          <Form.Group as={Col} xs="6">
            <Form.Label>To</Form.Label>
            <Form.Control type="date" name="to" onChange={handleDate} />
          </Form.Group>
        </Form.Row>
        <hr />

        <div className={Styles.charts}>
          <div className={Styles.chart}>
            {pieIncome ? (
              <>
                <h1>Income Chart</h1>
                <Pie
                  height={100}
                  width={200}
                  data={pieIncome}
                  options={{ maintainAspectRatio: false }}
                />
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={Styles.chart}>
            {pieExpense ? (
              <>
                <h1>Expense Chart</h1>
                <Pie
                  height={100}
                  width={200}
                  data={pieExpense}
                  options={{ maintainAspectRatio: false }}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </Dashboard>
  );
};

export default CategoryBreakdown;
