import { useContext } from "react"
import AppContext from "./context/AppContext"
import ShowProduct from "./components/product/ShowProduct"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/Navbar";

function App() {
  // const {data} = useContext(AppContext)
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
