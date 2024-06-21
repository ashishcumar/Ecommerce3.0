import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import App from "../App";
import ProductPage from "../Pages/ProductPage";
import CartPage from "../Pages/CartPage";
import CategoryPage from "../Pages/CategoryPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:type" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<App />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
