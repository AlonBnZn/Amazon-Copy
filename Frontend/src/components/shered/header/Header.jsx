import "./Header.css";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import NavBar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import SerchBox from "../../SearchBox";
import { Dropdown, DropdownButton, NavDropdown } from "react-bootstrap";
import { Store } from "../../../Store";
import { useContext } from "react";

export default function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  console.log(userInfo);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="amazon-nav">
      <NavBar>
        <Container>
          <LinkContainer to="/">
            <NavBar.Brand>
              <img
                src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                width={80}
                alt="Amazon logo"
              />
            </NavBar.Brand>
          </LinkContainer>{" "}
          <SerchBox />
          {userInfo ? (
            <div className="d-flex">
              <NavDropdown
                className="text-white"
                title={userInfo.user}
                id="basic-nav-dropdown"
              >
                <LinkContainer to={"/profile"}>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to={"/orderhistory"}>
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                {/* TODO: signout on click function */}
                <Link to={"#signout"} className="dropdown-item">
                  Sign Out
                </Link>
              </NavDropdown>

              <Link to="/cart" className="nav-link ms-4">
                <FontAwesomeIcon icon={faShoppingCart} className="text-white" />
                {/*badge */}
              </Link>
            </div>
          ) : (
            <>
              <Link className="nav-link text-white" to="/signin">
                Sign In
              </Link>
              <Link className="nav-link text-white" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </Container>
      </NavBar>
    </div>
  );
}
