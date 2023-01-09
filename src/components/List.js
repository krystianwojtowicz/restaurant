import { useState, useEffect, useContext } from "react";
import { db } from "../firebase-config";
import Product from "./Product";
import { collection, getDocs } from "firebase/firestore";
import { OrderContext } from "./OrderContext";

function List() {
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

  const onAdd = (pizza) => {
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

  return (
    <main>
      {pizzas.map((pizza) => {
        return <Product key={pizza.id} pizza={pizza} onAdd={onAdd}></Product>;
      })}
    </main>
  );
}

export default List;
