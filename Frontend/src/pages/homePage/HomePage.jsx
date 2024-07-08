import { useEffect, useReducer, useState } from "react";
import Title from "../../components/shared/Title.jsx";
import homePageReducer from "../../reducers/homePageReducer.jsx";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../../actions.jsx";
import axios from "axios";
import Loading from "../../components/shared/Loading.jsx";
import MessageBox from "../../components/MessageBox.jsx";
import Products from "../../components/Products.jsx";
import { Container } from "react-bootstrap";

const initialState = {
  loading: true,
  error: "",
  products: [],
};
export default function HomePage() {
  const [state, dispatch] = useReducer(homePageReducer, initialState);
  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: GET_REQUEST });

      try {
        const res = await axios.get("http://localhost:8080/api/v1/products"); // TODO: change after deployed to the correct addrss!!!!

        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (error) {
        console.log(error); //remove later
        dispatch({ type: GET_FAIL, payload: error.message });
        setMessage(error.message);
      }
    };
    getProducts();
  }, []); // Adding an empty dependency array to ensure the effect runs only once

  const [message, setMessage] = useState();
  return (
    <div>
      <Container>
        <Title title={"HomePage"} />
        <div className="backgroundHomePage">
          <img
            style={{ width: "100%" }}
            src="https://m.media-amazon.com/images/I/81d5OrWJAkL._SX3000_.jpg"
            alt=""
          />
        </div>
        <div className="products">
          {state.loading ? (
            <Loading />
          ) : state.error ? (
            <MessageBox message={message} variant="danger" />
          ) : (
            <Products products={state.products}></Products>
          )}
        </div>
      </Container>
    </div>
  );
}
