import { createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom";

import Home from "#views/Home";
import Products from "#views/Products";
import ProductDetail from "#views/ProductDetail";
import AddProduct from "#views/AddProduct";

function App (){
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element = {<Home />} />
        <Route path="products" element={<Products /> } />
        <Route path="products/:productsid" element={<ProductDetail /> } />
        <Route path="/addproduct/:productId" element={<AddProduct />} /></Route>
    )
  ) 

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
};

export default App;
