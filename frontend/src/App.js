import "./App.css";
import {BrowserRouter, Route, Routes}from "react-router-dom"
import HomeFile from "./component/HomeFile";
import NavBar from "./component/NavBar";
import ProductFile from "./component/ProductFile";
function App() {
return(
  <BrowserRouter>
  <NavBar/>
  <Routes>
    <Route path="/" element={<HomeFile />}/>
    <Route path="/product/:slug" element={<ProductFile />}/>

  </Routes>
  </BrowserRouter>
  )
}

export default App;
