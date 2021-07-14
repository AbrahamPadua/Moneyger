// FUNCTIONS
import Router from "next/router";
import auth from "../../providers/authProvider";
import { useEffect, useState } from "react";
import { inputHandler } from "../../app-helper";
import categoryProvider from "../../providers/categoryProvider";
import transactionProvider from "../../providers/transactionProvider";
import Swal from "sweetalert2";
// COMPONENTS
import Link from "next/link";
import { Form, Row, Col, Card } from "react-bootstrap";
import Dashboard from "../../components/Dashboard/Dashboard";
// STYLES
import Styles from "../../styles/Transaction.module.scss";
import { useMutation } from "@apollo/client";
import { addT } from "../../graphql/mutations";

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
  const [newT, setNewT] = useState({
    category: "",
    type: "",
    amount: 0,
    description: "",
  });
  const [allCs, setAllCs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [addTransaction, { data }] = useMutation(addT)

  // Retrieving all categories
  useEffect(async () => {
    await auth.checkAuth();
    const categs = await categoryProvider.getCategories();
    if (!categs instanceof Array) return;
    setAllCs(categs);
  }, []);

  useEffect(() => {
    handleType({ target: { value: "Income", name: "type" } });
  }, [allCs]);

  const handleType = (e) => {
    inputHandler(e, newT, setNewT);
    if (!allCs) return;

    const type = e.target.value;
    let filteredCs = allCs
      .filter((categ) => categ.type.toLowerCase() === type.toLowerCase())
      .map((categ) => {
        return (
          <option key={categ.id} value={categ.name}>
            {categ.name}
          </option>
        );
      });
    setCategories(filteredCs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Amount Validation
    if (newT.amount < 0)
      return Swal.fire({
        icon: "error", title: "Invalid Amount", text: "Please provide a positive amount.",
      });

    // Checking empty fields
    for (let x of Object.keys(newT)) {
      if (!newT[x] && x !== "description")
        return Swal.fire(`Unfilled Field`, `${x} is required`, "error");
    }

    // const error = await transactionProvider.createTransaction(newT);
    newT.category = allCs.find(categ => categ.name === newT.category)
    const newTransact = {
      amount: +newT.amount,
      description: newT.description,
      category: {
        name: newT.category.name,
        type: newT.category.type,
        icon: {
          name: newT.category.icon.name,
          color: newT.category.icon.color
        }
      }
    }

    console.log(newTransact)
    const { data: { addTransaction: success } } = await addTransaction({ variables: { uid: localStorage.getItem("uid"), input: newTransact } })
    if (success) {
      console.log(`SUCCESS!`)
    }

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
      <Form.Group controlId="category" className={Styles.newTransactGroup}>
        <Form.Label className={Styles.newTransactLabel}>Category:</Form.Label>
        <Form.Control
          as="select"
          name="category"
          onChange={(e) => inputHandler(e, newT, setNewT)}
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
          onChange={(e) => inputHandler(e, newT, setNewT)}
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
          onChange={(e) => inputHandler(e, newT, setNewT)}
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
