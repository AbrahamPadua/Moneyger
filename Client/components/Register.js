// FUNCTIONS
import { useContext, useState } from "react";
import auth from "../providers/authProvider";
// COMPONENTS
import { Form, Button } from "react-bootstrap";
import FormGroup from "./FormGroup";
// CONTEXT
import { FormContext } from "../Contexts";

const Register = ({ Styles }) => {
  const { setForm } = useContext(FormContext)
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    vPassword: "",
  });

  // Register function
  const Authenticate = (e) => {
    e.preventDefault();

    auth.register({ user, setUser });
  };

  return (
    <>
      <h1 className={Styles.authHeader}>Create your <span className={Styles.m}></span>
        <span>oneyger</span></h1>
      <Form onSubmit={Authenticate} className={`${Styles.authForm} ${Styles.regForm}`}>
        {[
          ["First Name", "firstName"],
          ["Last Name", "lastName"],
          ["Email", "email"],
          ["Password", "password"],
          ["Verify Password", "vPassword"],
        ].map((label) => {
          return (
            <FormGroup
              key={label[1]}
              label={label[0]}
              name={label[1]}
              value={user[label[1]]}
              user={user}
              setUser={setUser}
              Styles={Styles}
            />
          );
        })}
        <Button variant="success" type="submit" className={Styles.authButton}>
          Register
        </Button>
        <div className={Styles.authFooter}>
          <p>Already have a Moneyger?&nbsp;</p>
          <a href="#" className={Styles.toLogin} onClick={() => setForm(true)}>Login</a>
        </div>
      </Form>
    </>
  );
};

export default Register;
