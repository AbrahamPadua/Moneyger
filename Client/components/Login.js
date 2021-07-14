// FUNCTIONS
import { useContext, useState } from "react";
import auth from "../providers/authProvider";
import { inputHandler } from "../app-helper";
// COMPONENTS
import Link from "next/link";
import { Form, Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
// CONTEXT
import { FormContext } from "../Contexts";

const Login = ({ Styles }) => {
  const { setForm } = useContext(FormContext)
  const [user, setUser] = useState({ email: "", password: "" });

  return (
    <Form
      className={Styles.authForm}
      onSubmit={(e) => auth.login(e, user)}
    >
      <Form.Group controlId="email" className={Styles.authGroup}>
        <Form.Control
          type="text"
          name="email"
          value={user.email}
          onChange={(e) => inputHandler(e, user, setUser)}
          className={Styles.authInput}
          required
        ></Form.Control>
        <Form.Label className={Styles.authLabel}>Email</Form.Label>
      </Form.Group>
      <Form.Group controlId="password" className={`${Styles.authGroup} ${Styles.second}`}>
        <Form.Control
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => inputHandler(e, user, setUser)}
          className={Styles.authInput}
          required
        ></Form.Control>
        <Form.Label className={Styles.authLabel}>Password </Form.Label>
      </Form.Group>
      <Button
        variant="warning"
        type="submit"
        className="mt-3 w-100 mb-2"
        className={Styles.authButton}
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
      <div className={`${Styles.authFooter} ${Styles.loginFooter}`}>
        <p>Create new Moneyger?&nbsp;</p>
        {/* <Link href="/register"> */}
        <a href="#" className={Styles.toRegister} onClick={() => setForm(false)}>Create Account</a>
        {/* </Link> */}
      </div>
    </Form>
  )
}

export default Login
