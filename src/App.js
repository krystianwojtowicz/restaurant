import { useState } from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
// import { Link, HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Basket from "./components/Basket";
import List from "./components/List";
import Confirmation from "./components/Confirmation";
import { OrderContext } from "./components/OrderContext";
import "./App.scss";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addPizza = (pizza) => {
    const exist = cartItems.find((x) => x.id === pizza.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === pizza.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...pizza, qty: 1 }]);
    }
    console.log(cartItems);
  };

  const removePizza = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <OrderContext.Provider value={{ cartItems, setCartItems }}>
      <div className="App">
        <BrowserRouter>
          {/* <nav>
            <ul>
              <li>PIZZA HUNT</li>
              <li>
                <Link to="/basket">Basket</Link>
              </li>
            </ul>
          </nav> */}
          <nav>
            <span>PIZZA HUNT</span>
            <Link to="/basket">Basket</Link>
            <Link to="/confirmation">Confirmation</Link>
            <Link to="/">Home</Link>
          </nav>
          <Routes>
            <Route
              path="/"
              element={<List addPizza={addPizza} removePizza={removePizza} />}
            ></Route>
            <Route
              path="/basket"
              element={<Basket addPizza={addPizza} removePizza={removePizza} />}
            ></Route>
            <Route path="/confirmation" element={<Confirmation />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </OrderContext.Provider>
  );
}

export default App;
