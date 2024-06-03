import Navbar from "./components/navbar/navbar";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Shop from "./pages/shop";
import Product from "./pages/product";
import Cart from "./pages/cart";
import LoginSignUp from "./pages/loginsignup";
import Footer from "./components/footer/footer";
import ShopContextProvider from "./context/shopcontextprovider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./components/addProduct/addproduct";

function App() {
  // console.log(user.user.username)
  return (
    <ShopContextProvider>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Shop />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/login" element={<LoginSignUp />} />
            <Route exact path="/product" element={<Product />} />
            <Route exact path="/product/:productId" element={<Product />} />
            <Route exact path="/admin" element={<AddProduct />} />
          </Routes>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={2200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
          />
        </BrowserRouter>
      </div>
    </ShopContextProvider>
  );
}

export default App;
