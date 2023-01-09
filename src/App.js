import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Basket from "./components/Basket";
import List from "./components/List";
import Confirmation from "./components/Confirmation";
import { OrderContext } from "./components/OrderContext";

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <OrderContext.Provider value={{ cartItems, setCartItems }}>
      <div className="App">
        <BrowserRouter>
          <nav>
            <ul>
              <li>PIZZA HUNT</li>
              <li>
                <Link to="/basket">Basket</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<List />}></Route>
            <Route path="/basket" element={<Basket />}></Route>
            <Route path="/confirmation" element={<Confirmation />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </OrderContext.Provider>
  );
}

export default App;
