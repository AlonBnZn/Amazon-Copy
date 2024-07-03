import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Title from "../components/shered/Title";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import amazonLogo from "../assets/img/amazon-logo.png";
import Error from "../components/shered/erorr/error";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [reEnterPass, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    // Validation checks
    if (name.length < 2) {
      setErrorMessage("Name must have at least 4 characters");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must have at least 6 characters");
      return;
    }
    if (password !== reEnterPass) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        {
          name,
          email,
          password,
        }
      );
      console.log(response.data);
      // Handle successful signup (e.g., navigate to another page)
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);

      navigate("/");
    } catch (error) {
      console.error("There was an error making the request:", error);
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        setErrorMessage(
          `Server responded with error: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage(`Error in setting up request: ${error.message}`);
      }
    }
  };

  return (
    <div>
      {errorMessage && <Error errorMessage={errorMessage} />}
      <img
        src={amazonLogo}
        className="align"
        alt="AmazonLogo"
        width={"100px"}
      />
      <Container
        className="border rounded d-block text-center mt-5"
        style={{ maxWidth: "400px" }}
      >
        <Title title="SignUP Page" />
        <h1 className="text-start mt-3">Create Account</h1>
        <Form className="d-block" onSubmit={handleSubmit}>
          <Form.Label style={{ width: "360px" }} className="text-start fw-bold">
            Your Name
          </Form.Label>
          <Form.Control
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="border-dark"
          ></Form.Control>
          {/* next field */}
          <Form.Label
            style={{ width: "360px" }}
            className="text-start fw-bold mt-3"
          >
            Email
          </Form.Label>
          <Form.Control
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-dark"
          ></Form.Control>
          {/* next field */}
          <Form.Label
            style={{ width: "360px" }}
            className="text-start fw-bold mt-3"
          >
            Password
          </Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="At least 6 characters"
            onChange={(e) => setPassword(e.target.value)}
            className="border-dark"
          ></Form.Control>
          <p className="text-start" style={{ fontSize: "13px" }}>
            <FontAwesomeIcon icon={faExclamation} className="me-1 ms-1" />
            Passwords must be at least 6 characters.
          </p>
          {/* next field */}
          <Form.Label
            style={{ width: "360px" }}
            className="text-start fw-bold mt-1"
          >
            Re-enter password
          </Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setRePassword(e.target.value)}
            className="border-dark"
          ></Form.Control>
          <Button
            className="btn btn-warning mt-3"
            style={{ width: "370px", height: "40px" }}
            type="submit"
          >
            Continue
          </Button>
          <p className="mt-4" style={{ fontSize: "13px", textAlign: "start" }}>
            By creating an account, you agree to Amazon's Conditions of Use and
            Privacy Notice.
          </p>
          <hr />
          <p style={{ fontSize: "13px", textAlign: "start" }}>
            Already have an account? <Link to="/signin">Sign in {">"}</Link>
          </p>
        </Form>
      </Container>
    </div>
  );
}
