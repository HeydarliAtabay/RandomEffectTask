import { Form, Alert, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginComponent(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { serverError } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    const credentials = { username, password };
    const emailcheck = username.includes("@");
    let valid = true;
    if (username === "" || password === "" || password.length < 6)
      valid = false;

    if (valid) {
      props.login(credentials);
    }
    if (password.length <= 5)
      setErrorMessage(
        "The length of password should be higher than 5 characters"
      );

    if (!emailcheck) {
      setErrorMessage("Username should be an email address");
    }
  };

  return (
    <>
      <div className="cont">
        <div className="loginContainer">
          <div className="loginForm">
            <Row>
              <Col sm={12}>
                <h5 style={{ color: "white" }}>Login </h5>
              </Col>
            </Row>
            <Form variant="dark">
              <Form.Group controlId="username">
                <Form.Label className="formtxt">
                  {" "}
                  <span style={{ marginTop: "5px", color: "white" }}>
                    Email address
                  </span>
                </Form.Label>
                <Form.Control
                  type="email"
                  value={username}
                  onChange={(ev) => setUsername(ev.target.value)}
                  size="lg"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="formtxt">
                  <span style={{ color: "white" }}>Password</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  size="lg"
                />
              </Form.Group>
              {errorMessage ? (
                <Alert variant="danger">{errorMessage}</Alert>
              ) : (
                ""
              )}
              {serverError ? <Alert variant="danger">{serverError}</Alert> : ""}
              <button className="btnlog" onClick={handleSubmit}>
                Login
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
