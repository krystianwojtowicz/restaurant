import { useState, useEffect, useContext } from "react";
import { db } from "../firebase-config";
import Product from "./Product";
import { collection, getDocs } from "firebase/firestore";
import { OrderContext } from "./OrderContext";

function List(props) {
  const { cartItems, setCartItems } = useContext(OrderContext);
  const [pizzas, setPizzas] = useState([]);
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
        return (
          <Product
            key={pizza.id}
            pizza={pizza}
            addPizza={props.addPizza}
          ></Product>
        );
      })}
    </main>
  );
}

export default List;
