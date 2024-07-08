import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import PropTypes from "prop-types";
const Checkout = ({ cartItems, checkoutHandler }) => {
  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroupItem>
          <h3>{/* counts the items in cart */}</h3>
          Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} Items): $
          {cartItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}
        </ListGroupItem>
        <ListGroupItem>
          <div className="d-grid">
            <Button
              type="button"
              variant="primary"
              onClick={() => checkoutHandler()}
              disabled={cartItems.lenght === 0}
            >
              Checkout
            </Button>
          </div>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};
Checkout.propTypes = {
  cartItems: PropTypes.array,
  checkoutHandler: PropTypes.func,
};
export default Checkout;
