import "./Header.css";
import Container from "react-bootstrap/Container";
import NavBar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import SerchBox from "../../SearchBox";
import { NavDropdown, Badge } from "react-bootstrap";
import { Store } from "../../../Store";
import { useContext } from "react";
import { USER_SIGNOUT } from "../../../actions";

export default function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    ctxDispatch({ type: USER_SIGNOUT });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("ShippingAddres");
    localStorage.removeItem("paymentMethod");
  };

  return (
    <div className="amazon-nav">
      <NavBar>
        <Container>
          <Link onClick={() => navigate(-1)}>
            {location.pathname !== "/" && (
              <i className="fa fa-arrow-left text-white align-arrow-right">
                Back
              </i>
            )}
          </Link>
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

                <Link
                  onClick={handleLogOut}
                  to={"#signout"}
                  className="dropdown-item"
                >
                  Sign Out
                </Link>
              </NavDropdown>
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
          <Link to="/cart" className="nav-link ms-4">
            <FontAwesomeIcon icon={faShoppingCart} className="text-white" />
            {cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
        </Container>
      </NavBar>
    </div>
  );
}
