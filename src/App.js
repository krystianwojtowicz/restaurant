import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Basket from "./components/Basket";
import List from "./components/List";
import Confirmation from "./components/Confirmation";

function App() {
  return (
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
  );
}

export default App;
