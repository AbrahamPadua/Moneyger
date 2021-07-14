import { Form } from "react-bootstrap";
import { inputHandler } from "../app-helper";

const FormGroup = ({ label, name, value, user, setUser, Styles }) => {
  return (
    <Form.Group className={Styles.authGroup}>
      <Form.Control
        type={
          label == "Password" || label == "Verify Password"
            ? "password"
            : "text"
        }
        name={name}
        value={value}
        onChange={(e) => inputHandler(e, user, setUser)}
        required
        className={Styles.authInput}
      ></Form.Control>
      <Form.Label className={Styles.authLabel}>{label}:</Form.Label>
    </Form.Group>
  );
};

export default FormGroup;
