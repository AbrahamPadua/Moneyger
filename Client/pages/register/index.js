import { useState } from "react";
import auth from "../../providers/authProvider";

// Components
import { Form, Button } from "react-bootstrap";
import FormGroup from "../../components/FormGroup";
import View from "../../components/View";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
    password: "",
    vPassword: "",
  });

  // Register function
  const Authenticate = (e) => {
    e.preventDefault();

    auth.register({ user, setUser });
  };

  return (
    <View>
      <h1 className="mt-3">Register Page</h1>
      <Form onSubmit={Authenticate}>
        {[
          ["First Name", "firstName"],
          ["Last Name", "lastName"],
          ["Email", "email"],
          ["Mobile No.", "mobileNo"],
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
            />
          );
        })}
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
    </View>
  );
};

export default Register;
