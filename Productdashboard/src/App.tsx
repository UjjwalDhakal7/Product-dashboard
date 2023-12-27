import { createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom";

import Home from "#views/Home";
import Products from "#views/Products";
function App (){
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element = {<Home />} />
        <Route path="Products" element={<Products /> } />
      </Route> 
    )
  ) 

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
};

export default App;
