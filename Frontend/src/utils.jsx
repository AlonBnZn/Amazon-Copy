import axios from "axios";
import { toast } from "react-toastify";
import { ADD_TO_CART, GET_FAIL } from "./actions";

const addToCarthandler = async (product, cartItems, ctxDispatch) => {
  const existedItem = cartItems.find((x) => x._id === product._id);
  const quantity = existedItem ? existedItem.quantity + 1 : 1;
  try {
    const { data } = await axios.get(`/api/products${product._id}`);
    if (data.countInStock < quantity) {
      toast.error("Sorry, Product out of stock");
      return;
    }
    ctxDispatch({ type: ADD_TO_CART, payload: { ...product, quantity } });
  } catch (err) {
    ctxDispatch({ type: GET_FAIL, payload: err.message });
  }
};
export { addToCarthandler };
