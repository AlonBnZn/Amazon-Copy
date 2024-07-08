import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Rating from "../../components/shared/rating/Rating";
import { Store } from "../../Store";
import { useContext } from "react";
import { addToCarthandler } from "../../utils";
const Product = ({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <Card className="product-card">
      <Link to={`/product/${product.token}`}>
        <Card.Img
          style={{ padding: "20px" }}
          variant="top"
          src={product.image}
          alt={product.title}
        ></Card.Img>
      </Link>
      <Card.Body className="card-body">
        <Link to={`/product/${product.token}`}>
          <Card.Title>
            {product.title.length > 60
              ? product.title.substring(0, 50) + "..."
              : product.title}{" "}
          </Card.Title>
        </Link>
        {/* rating */}
        <Rating
          rating={product.rating.rate}
          numReviews={product.rating.count}
        />
        <Card.Text>{product.price}$</Card.Text>
        <>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of stock
            </Button>
          ) : (
            <Button
              className="btn-primary"
              onClick={() => addToCarthandler(product, cartItems, ctxDispatch)}
            >
              Add to cart
            </Button>
          )}
        </>
      </Card.Body>
    </Card>
  );
};
Product.propTypes = { product: PropTypes.object };
export default Product;
