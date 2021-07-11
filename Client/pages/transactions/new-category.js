// FUNCTIONS
import { useState, useEffect } from "react";
import { inputHandler } from "../../app-helper";
import auth from "../../providers/authProvider";
import categoryProvider from "../../providers/categoryProvider";
import Swal from "sweetalert2";
// COMPONENTS
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Dashboard from "../../components/Dashboard/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// STYLING
import Styles from "../../styles/Categories.module.scss";
import Icons from "../../providers/iconProvider";

const NewCategory = () => {
  return (
    <Dashboard title="Category">
      <Row className={Styles.newCategory}>
        <Col xs md="6">
          <h3 className={Styles.newCategoryHeader}>New Category</h3>
          <Card className={Styles.newCategoryCard}>
            <Card.Body>
              <NewCategoryForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Dashboard>
  );
};

const NewCategoryForm = () => {
  const [newC, setNewC] = useState({
    name: "",
    type: "",
    icon: {
      name: "",
      color: "#01987a",
    },
  });
  const [icons, setIcons] = useState(<></>);
  const [tentativeIcon, setTentativeIcon] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(async () => {
    await auth.checkAuth();
    setIcons(Icons.getIcons(setTentativeIcon));
  }, []);

  const createCategory = (e) => {
    e.preventDefault();
    for (let x of Object.keys(newC)) {
      if (!newC[x]) {
        Swal.fire(
          "Incomplete Form",
          "Please make sure the you have filled all the required field.",
          "error"
        );
        return;
      }
    }

    categoryProvider.createCategory(newC);
  };

  const changeIcon = (e) => {
    e.preventDefault();
    setNewC({ ...newC, icon: { name: tentativeIcon, color: newC.icon.color } });
    Icons.toggleIconSelection(e);
  };

  const selectIcon = (e) => {
    const selectedIcons = document.getElementsByClassName(Styles.select);
    for (let icon of selectedIcons) {
      icon.classList.remove(Styles.select);
    }
    setTentativeIcon(e.target.id);
    e.target.classList.add(Styles.select);
  };

  const filterIcons = (e) => {
    e.preventDefault();
    const filteredIcons = Icons.search(searchValue);

    const newIcons = filteredIcons.map((icon) => {
      if (icon === "stopwatch20") icon = "stopwatch-20";
      return (
        <div className={Styles.icon} key={icon} id={icon} onClick={selectIcon}>
          <FontAwesomeIcon icon={["fas", icon]} />
          {icon.length > 15 ? `${icon.slice(0, 12)}...` : icon}
        </div>
      );
    });

    setIcons(newIcons);
  };

  return (
    <>
      <Form onSubmit={createCategory} className={Styles.categForm}>
        <Form.Group controlId="categoryName" className={Styles.formGroup}>
          <Form.Label className={Styles.formLabel}>Category Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={(e) => inputHandler(e, newC, setNewC)}
            placeholder="Enter category name"
            className={Styles.formInput}
            required
          />
        </Form.Group>
        <Form.Group controlId="typeName" className={Styles.formGroup}>
          <Form.Label className={Styles.formLabel}>Category Type:</Form.Label>
          <Form.Control
            as="select"
            name="type"
            onChange={(e) => inputHandler(e, newC, setNewC)}
            defaultValue="default"
            className={Styles.formInput}
            required
          >
            <option value="default" disabled>
              Select Category
            </option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className={Styles.formGroup}>
          <Form.Label className={Styles.formLabel}>Icon:</Form.Label>
          <br />
          <button
            onClick={Icons.toggleIconSelection}
            className={Styles.selectButton}
          >
            Select
          </button>
          {newC.icon.name ? (
            <>
              <div
                className={Styles.shownIconWrapper}
                style={{ backgroundColor: newC.icon.color }}
              >
                <FontAwesomeIcon
                  icon={["fas", newC.icon.name]}
                  className={Styles.shownIcon}
                />
              </div>
              {newC.icon.name}
            </>
          ) : (
            <>
              <div
                className={Styles.shownIconWrapper}
                style={{ backgroundColor: newC.icon.color }}
              >
                <FontAwesomeIcon
                  icon={["fas", "ad"]}
                  className={Styles.shownIcon}
                />
              </div>
              ad
            </>
          )}
        </Form.Group>
        <Form.Group className={Styles.formGroup}>
          <Form.Label className={Styles.formLabel}>
            Color:&nbsp;&nbsp;
          </Form.Label>
          <input
            type="color"
            name="color"
            value={newC.icon.color}
            onChange={(e) =>
              setNewC({
                ...newC,
                icon: { name: tentativeIcon, color: e.target.value },
              })
            }
          />
        </Form.Group>
        <div className={Styles.buttonWrapper}>
          <button type="submit" className={Styles.formButton}>
            Create
          </button>
        </div>
      </Form>
      <Form
        id="iconForm"
        className={Styles.iconSelection}
        onSubmit={changeIcon}
      >
        <Form.Group className={Styles.searchWrapper}>
          <Form.Control
            type="text"
            placeholder="Search Icons..."
            className={Styles.iconSearch}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button className={Styles.SearchButton} onClick={filterIcons}>
            Search
          </Button>
        </Form.Group>
        <div className={Styles.icons}>{icons}</div>
        <div className={Styles.buttons}>
          <Button type="submit" className={Styles.iconFormButtons}>
            Select
          </Button>
          <Button
            onClick={Icons.toggleIconSelection}
            className={Styles.iconFormButtons}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </>
  );
};

export default NewCategory;
