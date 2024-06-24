import Title from "../components/shared/Title";
import { useEffect, useReducer } from "react";
import homePageReducer from "../reducers/homePageReducer.jsx";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../actions.jsx";
import axios from "axios";

const initialState = {
  loading: true,
  error: "",
  Product: [],
};

const HomePage = () => {
  const [state, dispatch] = useReducer(homePageReducer, initialState);
  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: GET_REQUEST });
      try {
        const res = await axios.get("http://localhost:8080/api/v1/products");
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (error) {
        dispatch({ type: GET_FAIL, payload: error.message });
      }
    };
    getProducts();
  }, []);
  return (
    <>
      <Title title={"HomePage"} />
      <div className="backgroundHomePage">
        <img
          style={{ width: "100%" }}
          src="https://m.media-amazon.com/images/I/81d5OrWJAkL._SX3000_.jpg"
          alt="backgroundHomePage"
        />
      </div>
      <div className="products">
        {state.loading ? (
          // <loading />
          <div>loading</div>
        ) : state.error ? (
          // <MassageBox variant="danger">{state.error}</MassageBox>
          <div>{state.error}</div>
        ) : (
          <div>products dispalyed here</div>
        )}
      </div>
    </>
  );
};

export default HomePage;
