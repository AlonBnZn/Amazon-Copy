import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/shared/header/Header";
import HomePage from "./pages/homePage/HomePage";
import Footer from "./components/shared/Footer";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import PaymentPage from "./pages/PaymentPage";
import SubmitOrderPage from "./pages/SubmitOrderPage";
import OrderPage from "./pages/OrderPage";
import SearchPage from "./pages/SearchPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column side-allPage min-width">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:token" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<ShippingAddressPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<SubmitOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
