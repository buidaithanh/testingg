import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMassage";
const LoginForm = () => {
  //router
  const nagative = useNavigate();

  //context
  const { LoginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  const { username, password } = loginForm;

  const [alert, setAlert] = useState(null);

  const changeLoginForm = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const login = async (e) => {
    e.preventDefault();

    try {
      const loginData = await LoginUser(loginForm);
      if (loginData.success) {
        nagative("/dashboard");
      } else {
        setAlert({ type: "danger", message: loginData.message });
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
          <Form onSubmit={login}>
            <AlertMessage info={alert} />
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                className="margin-bottom-20"
                required
                value={username}
                onChange={changeLoginForm}
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
                onChange={changeLoginForm}
              ></Form.Control>
            </Form.Group>
            <Button variant="success" type="submit">
              Login
            </Button>
          </Form>
          <p>Don't have an account?</p>
          <Link to="/register">
            <Button variant="info" size="sm" className="ml-2">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
