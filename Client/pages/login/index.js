// Functions
import { useState } from "react";
import auth from "../../providers/authProvider";
import { inputHandler } from "../../app-helper";
// Components
import Link from "next/link";
import View from "../../components/View";
import { Form, Button, Row, Col } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
// STYLES
import Styles from "../../styles/Login.module.scss";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  return (
    <View title="Login Page | Booking App">
      <Row className={Styles.loginPage}>
        <Col xs md="6" className={Styles.login}>
          <div className={Styles.loginFormWrapper}>
            <h1 className={Styles.loginHeader}>
              Login your <span className={Styles.m}></span>
              <span>oneyger</span>
            </h1>
            <Form
              className={Styles.loginForm}
              onSubmit={(e) => auth.login(e, user)}
            >
              <Form.Group controlId="email" className={Styles.loginGroup}>
                <Form.Control
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={(e) => inputHandler(e, user, setUser)}
                  className={Styles.loginInput}
                  required
                ></Form.Control>
                <Form.Label className={Styles.loginLabel}>Email</Form.Label>
              </Form.Group>
              <Form.Group controlId="password" className={Styles.loginGroup}>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => inputHandler(e, user, setUser)}
                  className={Styles.loginInput}
                  required
                ></Form.Control>
                <Form.Label className={Styles.loginLabel}>Password </Form.Label>
              </Form.Group>
              <Button
                variant="warning"
                type="submit"
                className="mt-3 w-100 mb-2"
                className={Styles.loginButton}
              >
                Login
              </Button>
              <p>or</p>
              <GoogleLogin
                clientId="431998142853-sdbhioev7kghr6abjq0lpc1cep52p002.apps.googleusercontent.com"
                className="w-100 text-center d-flex justify-content-center"
                buttonText="Login"
                // cookiePolicy={"single_host_origin"}
                onSuccess={auth.loginGoogle}
                onFailure={auth.loginGoogle}
                className={Styles.googleButton}
              />
              <div className={Styles.loginFooter}>
                <p>Create new Moneyger?&nbsp;</p>
                <Link href="/register">
                  <a className={Styles.toRegister}>Create Account</a>
                </Link>
              </div>
            </Form>
          </div>
          <div className={Styles.page}></div>
        </Col>
      </Row>
    </View>
  );
};

export default Login;
