import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../actions";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/shared/Loading";
import MessageBox from "../components/MessageBox";
import ProductDescription from "../components/procutDescription/ProductDescription";
import { addToCarthandler } from "../utils";
import productPageReducer from "../reducers/productPageReducer";
import { Row, Col, Container } from "react-bootstrap";
import CartDescription from "../components/procutDescription/CartDescription";

const initialState = {
  loading: true,
  error: "",
  product: [],
};
function ProductPage() {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const [{ loading, error, product }, dispatch] = useReducer(
    productPageReducer,
    initialState
  );
  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/products/token/${token}`
        );
        console.log(res);
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: toast.error(err.message) });
      }
    };
    getProduct();
  }, [token]);

  const addToCart = async () => {
    await addToCarthandler(product, cartItems, ctxDispatch);
    navigate("/cart");
  };
  return (
    <Container className="mt-3 p-4">
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img width={400} src={`${product.image}`} alt={product.title} />
            </Col>
            <Col md={3}>
              <ProductDescription {...product} />
            </Col>
            <Col md={3}>
              <CartDescription product={product} addToCart={addToCart} />
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
}

export default ProductPage;
