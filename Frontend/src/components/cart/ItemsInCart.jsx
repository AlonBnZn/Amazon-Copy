import PropTypes from "prop-types";
import MessageBox from "../MessageBox";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ItemsInCart = ({ cartItems, updateCartHandler, removeItemHandler }) => {
  return (
    <Container>
      {cartItems.length === 0 ? (
        <MessageBox>
          Your Cart Is Empty. <Link to="/">Go Back To Home Page</Link>
        </MessageBox>
      ) : (
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row className="align-items-center">
                <Col md={4}>
                  <img
                    className="img-fluid rounded img-thumbnail"
                    src={item.image}
                    alt={item.token}
                  />{" "}
                  <Col>{item.token}</Col>
                  <Link to={`/product/${item.token}`}>{item.name}</Link>
                </Col>
                <Col md={3}>
                  <Button
                    onClick={() => updateCartHandler(item, item.quantity - 1)}
                    variant="light"
                    name="minusButton"
                    disabled={item.quantity === 1}
                  >
                    <i className="fa fa-minus-circle"></i>
                  </Button>
                  <span>{item.quantity}</span>{" "}
                  <Button
                    onClick={() => updateCartHandler(item, item.quantity + 1)}
                    variant="light"
                    name="plusButton"
                    disabled={item.quantity === item.countInStock}
                  >
                    <i className="fa fa-plus-circle"></i>
                  </Button>
                </Col>
                <Col md={1}>${item.price}</Col>
                <Col md={1}>
                  <Button
                    onClick={() => removeItemHandler(item)}
                    variant="light"
                  >
                    <i className="fa fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

ItemsInCart.propTypes = {
  cartItems: PropTypes.array,
  updateCartHandler: PropTypes.func,
  removeItemHandler: PropTypes.func,
};

export default ItemsInCart;
