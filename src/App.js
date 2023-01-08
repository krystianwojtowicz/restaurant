// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Basket from "./components/Basket";
import List from "./components/List";
import Confirmation from "./components/Confirmation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
