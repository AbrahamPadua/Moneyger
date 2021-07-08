import { Form } from "react-bootstrap";
import { inputHandler } from "../app-helper";

const FormGroup = ({ label, name, value, user, setUser }) => {
  return (
    <Form.Group>
      <Form.Label>{label}:</Form.Label>
      <Form.Control
        type={
          label == "Password" || label == "Verify Password"
            ? "password"
            : "text"
        }
        name={name}
        value={value}
        placeholder={`Insert ${label} Here`}
        onChange={(e) => inputHandler(e, user, setUser)}
        required
      ></Form.Control>
    </Form.Group>
  );
};

export default FormGroup;
