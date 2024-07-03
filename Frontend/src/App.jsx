import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/shered/header/Header";
import HomePage from "./pages/homePage/HomePage";
import Footer from "./components/shered/Footer";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
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
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
