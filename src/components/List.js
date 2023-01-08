import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import Product from "./Product";
import { collection, getDocs } from "firebase/firestore";

// comments:
// i can add localStorage, ts
function List() {
  const [pizzas, setPizzas] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const pizzasCollectionRef = collection(db, "meals");

  useEffect(() => {
    const getPizzas = async () => {
      const data = await getDocs(pizzasCollectionRef);
      setPizzas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPizzas();
  }, []);

  return (
    <main>
      {pizzas.map((pizza) => {
        return <Product key={pizza.id} pizza={pizza}></Product>;
      })}
    </main>
  );
}

export default List;
