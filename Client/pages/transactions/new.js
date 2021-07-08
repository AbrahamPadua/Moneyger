// FUNCTIONS
import Router from "next/router";
import auth from "../../auth/authProvider";
import { useEffect, useState } from "react";
import { inputHandler } from "../../app-helper";
import categoryProvider from "../../auth/categoryProvider";
import transactionProvider from "../../auth/transactionProvider";
import Swal from "sweetalert2";
// COMPONENTS
import Link from "next/link";
import { Form, Row, Col, Card } from "react-bootstrap";
import Dashboard from "../../components/Dashboard/Dashboard";
// STYLES
import Styles from "../../styles/Transaction.module.scss";

const NewTransaction = () => {
  return (
    <Dashboard title="Transactions">
      <Row className="justify-content-center" className={Styles.newTransact}>
        <Col xs md="6" className={Styles.newTransactCard}>
          <h3 className={Styles.newTransactHeader}>Create Transaction</h3>
          <Card className={Styles.formWrapper}>
            <Card.Body>
              <NewTransactionForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Dashboard>
  );
};

const NewTransactionForm = () => {
  const [newTransaction, setNewTransaction] = useState({
    categoryName: "",
    type: "",
    amount: 0,
    description: "",
  });
  const [allCategories, setAllCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  // Retrieving all categories
  useEffect(async () => {
    await auth.checkAuth();
    const categories = await categoryProvider.getCategories();
    if (!categories instanceof Array) return;
    setAllCategories(categories);
  }, []);

  useEffect(() => {
    handleType({ target: { value: "Income", name: "type" } });
  }, [allCategories]);

  const handleType = (e) => {
    inputHandler(e, newTransaction, setNewTransaction);
    if (!allCategories) return;

    const type = e.target.value;
    let filteredCategories = allCategories
      .filter((category) => category.type.toLowerCase() === type.toLowerCase())
      .map((category) => {
        return (
          <option key={category["_id"]} value={category.name}>
            {category.name}
          </option>
        );
      });
    setCategories(filteredCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Amount Validation
    if (newTransaction.amount < 0)
      return Swal.fire({
        icon: "error", title: "Invalid Amount", text: "Please provide a positive amount.",
      });

    // Checking empty fields
    for (let x of Object.keys(newTransaction)) {
      if (!newTransaction[x] && x !== "description")
        return Swal.fire(`Unfilled Field`, `${x} is required`, "error");
    }

    const error = await transactionProvider.createTransaction(newTransaction);
    if (error)
      Swal.fire(["Something Went Wrong", "Please try again...", "error"])
    Router.push("/transactions");
  };

  return (
    <Form onSubmit={handleSubmit} className={Styles.newTransactForm}>
      <Form.Group controlId="type" className={Styles.newTransactGroup}>
        <Form.Label className={Styles.newTransactLabel}>
          Transaction Type:
        </Form.Label>
        <Form.Control
          as="select"
          name="type"
          onChange={handleType}
          defaultValue="Income"
          className={Styles.newTransactInput}
          required
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="categoryName" className={Styles.newTransactGroup}>
        <Form.Label className={Styles.newTransactLabel}>Category:</Form.Label>
        <Form.Control
          as="select"
          name="categoryName"
          onChange={(e) => inputHandler(e, newTransaction, setNewTransaction)}
          defaultValue="default"
          className={Styles.newTransactInput}
          required
        >
          <option value="default" disabled>
            Select Category Name
          </option>
          {categories}
        </Form.Control>
        <Link href={"/transactions/new-category"}>
          <a className={Styles.addCateg}>+ Create A New Category</a>
        </Link>
      </Form.Group>
      <Form.Group controlId="amount" className={Styles.newTransactGroup}>
        <Form.Label className={Styles.newTransactLabel}>Amount:</Form.Label>
        <Form.Control
          type="number"
          name="amount"
          onChange={(e) => inputHandler(e, newTransaction, setNewTransaction)}
          placeholder="Enter amount"
          className={Styles.newTransactInput}
          required
        />
      </Form.Group>
      <Form.Group controlId="description" className={Styles.newTransactGroup}>
        <Form.Label className={Styles.newTransactLabel}>
          Description:
        </Form.Label>
        <Form.Control
          type="text"
          name="description"
          onChange={(e) => inputHandler(e, newTransaction, setNewTransaction)}
          placeholder="Enter description"
          className={Styles.newTransactInput}
          required
        />
      </Form.Group>
      <div className={Styles.buttonWrapper}>
        <button type="submit" className={Styles.newTransactButton}>
          CREATE
        </button>
      </div>
    </Form>
  );
};

export default NewTransaction;
