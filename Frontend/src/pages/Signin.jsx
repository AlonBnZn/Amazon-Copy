import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Title from "../components/shared/Title";
import { Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import amazonLogo from "../assets/img/amazon-logo.png";
import Error from "../components/shared/erorr/error";
import axios from "axios";
import { Store } from "../Store";
import { USER_SIGNIN } from "../actions";

export default function Signin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/users/signin",
        {
          email,
          password,
        }
      );
      ctxDispatch({ type: USER_SIGNIN, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data)); // Save the token for future requests

      console.log("success");
      navigate(redirect || "/");
    } catch (error) {
      console.error("There was an error making the request:", error);
      if (error.response) {
        console.log(error.message);
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
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      {errorMessage && <Error errorMessage={errorMessage} />}
      <img
        src={amazonLogo}
        alt="AmazonLogo"
        width={"200px"}
        style={{ display: "flex", justifyContent: "center" }}
      />
      <Container
        className="border rounded d-block text-center mt-5"
        style={{ maxWidth: "400px", height: "500px" }}
      >
        <Title title="SignUP Page" />
        <h1 className="text-start mt-3">Sign In</h1>
        <Form className="d-block" onSubmit={handleSubmit}>
          <Form.Label style={{ width: "360px" }} className="text-start fw-bold">
            Email
          </Form.Label>
          <Form.Control
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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

          <Button
            className="btn btn-warning mt-3"
            style={{ width: "370px", height: "40px" }}
            type="submit"
          >
            Continue
          </Button>
          <p className="mt-4" style={{ fontSize: "13px", textAlign: "start" }}>
            {`By creating an account, you agree to Amazon's Conditions of Use and
            Privacy Notice.`}
          </p>
          <hr />
          <p style={{ fontSize: "13px", textAlign: "start" }}>
            {"> "}Need help ?
          </p>
        </Form>
      </Container>
      <Container className="d-flex justify-content-center mb-5">
        <hr />
        <Button
          className="mt-4 bg-white border  text-black d-flex justify-content-center shadow  "
          style={{ width: "400px", height: "40px" }}
        >
          <Link to={`/signup?redirect=${redirect}`} className="text-dark">
            Create your Amazon account
          </Link>
        </Button>
      </Container>
    </div>
  );
}
