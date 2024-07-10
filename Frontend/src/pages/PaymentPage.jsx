import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { SAVE_PAYMENT_METHOD } from "../actions";
import Title from "../components/shared/Title";
import { Button, Container, Form } from "react-bootstrap";
import CheckoutSteps from "../components/shared/CheckoutSteps";

const PaymentPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems, shippingAddress, paymentMethod },
    userInfo,
  } = state;
  const navigate = useNavigate();

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "Paypal"
  );
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: SAVE_PAYMENT_METHOD, payload: paymentMethodName });
    navigate("/placeorder");
  };
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, cartItems, userInfo, shippingAddress]);
  return (
    <>
      <Title title="Payment" />
      <CheckoutSteps step1 step2 />
      <Container className="small-container">
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="stripe">
            <Form.Label>stripe</Form.Label>
            <Form.Check
              type="radio"
              id="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="PayPal">
            <Form.Label>PayPal</Form.Label>
            <Form.Check
              type="radio"
              id="PayPal"
              value="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default PaymentPage;
