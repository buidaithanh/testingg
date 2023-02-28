import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext, useNavigate } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMassage";

const RegisterForm = () => {
  //context
  const { registerUser } = useContext(AuthContext);

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);
  const { username, password, confirmPassword } = registerForm;

  const onchangeRegisterForm = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const register = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        // nagative("/dashboard");
      } else {
        setAlert({ type: "danger", message: registerData.message });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>learn it</h1>
          <h4>keep track of what you are learning</h4>
          <Form onSubmit={register}>
            <AlertMessage info={alert}></AlertMessage>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                className="margin-bottom-20"
                required
                value={username}
                onChange={onchangeRegisterForm}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                className="margin-bottom-20"
                required
                value={password}
                onChange={onchangeRegisterForm}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                className="margin-bottom-20"
                required
                value={confirmPassword}
                onChange={onchangeRegisterForm}
              ></Form.Control>
            </Form.Group>
            <Button variant="success" type="submit">
              Register
            </Button>
          </Form>
          <p>Already have an account?</p>
          <Link to="/login">
            <Button variant="info" size="sm" className="ml-2">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
