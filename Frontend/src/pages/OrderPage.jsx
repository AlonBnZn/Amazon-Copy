import { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../actions";
import axios from "axios";
import { toast } from "react-toastify";
import orderPageReducer from "../reducers/orderPageReducer";
import Loading from "../components/shared/Loading";
import Title from "../components/shared/Title";
import MessageBox from "../components/MessageBox";
import { Card, Col, ListGroup, Row } from "react-bootstrap";

const OrderPage = () => {
  const {
    state: { userInfo, dispatch: ctxDispatch },
  } = useContext(Store);
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();
  const [{ loading, error, order }, dispatch] = useReducer(orderPageReducer, {
    loading: true,
    order: null,
    error: "",
  });

  useEffect(() => {
    const getOrder = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/order/${orderId}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: GET_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: error });
        toast.error(error);
      }
    };
    if (!userInfo) {
      navigate("/signin");
    }
    if (!order || (order._id && orderId !== order._id)) {
      getOrder();
      console.log(order);
    }
  }, [navigate, order, orderId, userInfo]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Loading />
      )}
      <div>
        <Title title="order" />
        <h1 className="my-3">order: {order._id.subtr(order._id.length - 6)}</h1>
        <Row>
          <Col>
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong> {order.shippingAddress.fullName}
                <br />
                <strong>
                  Address: {order.shippingAddress.address}{" "}
                  {order.shippingAddress.city} {order.shippingAddress.country}{" "}
                  {order.shippingAddress.postalCode}
                </strong>
                <br />
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Payment</Card.Title>
                  <Card.Text>
                    <strong>Method: </strong> {order.paymentMethod}
                  </Card.Text>
                  {order.isPaid ? (
                    <MessageBox variant="success">
                      Paid at {order.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Paid</MessageBox>
                  )}
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Items</Card.Title>
                  <ListGroup variant="flush">
                    {order.orderItems.map((item) => (
                      <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                          <Col md={6}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid rounded img-thumbnail"
                            ></img>{" "}
                            <Link to={`/product/${item.token}`}>
                              {item.title}
                            </Link>
                          </Col>
                          <Col md={3}>
                            <span>{item.quantity}</span>
                          </Col>
                          <Col md={3}>${item.price}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Order Summary</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>${order.itemsPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <strong>Order Total</strong>
                        </Col>
                        <Col>
                          <strong>${order.totalPrice.toFixed(2)}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Card.Body>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderPage;
