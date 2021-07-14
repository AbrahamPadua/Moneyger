// FUNCTIONS
import { useState, useEffect, createContext } from "react";
// Components
import View from "../../components/View";
import Login from "../../components/Login";
import Register from "../../components/Register";
import { Row, Col } from "react-bootstrap";
// STYLES
import Styles from "../../styles/Login.module.scss";
// CONTEXT
import { FormContext } from "../../Contexts"

const loginStyles = {
  left: "50%",
  borderTopRightRadius: "10px",
  borderBottomRightRadius: "10px"
}

const registerStyles = {
  left: "24%",
  borderTopLeftRadius: "10px",
  borderBottomLeftRadius: "10px"
}

const index = () => {
  // Login Form if true else register
  const [form, setForm] = useState(true)

  return (
    <FormContext.Provider value={{ setForm }}>
      <View title="Login Page | Booking App">
        <Row className={Styles.authPage}>
          <Col xs md="6" className={Styles.auth}>
            <div className={Styles.authFormWrapper}>
              <h1 className={Styles.authHeader}>
                Login your <span className={Styles.m}></span>
                <span>oneyger</span>
              </h1>
              <Login Styles={Styles} />
            </div>
            <div className={Styles.authFormWrapper}>
              <Register Styles={Styles} />
            </div>
          </Col>
        </Row>
        <div className={Styles.page} style={form ? loginStyles : registerStyles}></div>
      </View>
    </FormContext.Provider>
  );
};

export default index;
