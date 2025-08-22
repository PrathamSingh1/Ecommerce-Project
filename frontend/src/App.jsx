import { useContext } from "react"
import AppContext from "./context/AppContext"
import ShowProduct from "./components/product/ShowProduct"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";

function App() {
  // const {data} = useContext(AppContext)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
