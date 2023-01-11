import { useState, useEffect, useContext } from "react";
import { db } from "../firebase-config";
import Product from "./Product";
import { collection, getDocs } from "firebase/firestore";
import { OrderContext } from "./OrderContext";

// comments:
// i can add localStorage, ts, readme, scrapowanie, firebase problem?, img-links, icons-upgrade
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

  // const addPizza = (pizza) => {
  //   const exist = cartItems.find((x) => x.id === pizza.id);
  //   if (exist) {
  //     setCartItems(
  //       cartItems.map((x) =>
  //         x.id === pizza.id ? { ...exist, qty: exist.qty + 1 } : x
  //       )
  //     );
  //   } else {
  //     setCartItems([...cartItems, { ...pizza, qty: 1 }]);
  //   }
  //   console.log(cartItems);
  // };

  // const addPizza = (pizza) => {
  //   let exist, ingredients;
  //   const existWithIngredients = cartItems.find((x) => x.id === pizza.id);
  //   if (existWithIngredients.ingredients) {
  //     { ingredients, ...exist } = existWithIngredients;
  //   } else {
  //      exist = existWithIngredients;
  //   }
  //   console.log(exist);
  //   if (exist) {
  //     setCartItems(
  //       cartItems.map((x) =>
  //         x.id === pizza.id ? { ...exist, qty: exist.qty + 1 } : x
  //       )
  //     );
  //   } else {
  //     setCartItems([...cartItems, { ...pizza, qty: 1 }]);
  //   }
  //   console.log(cartItems);
  // };
  // const addPizza = (pizza) => {
  //   const exist = cartItems.find((x) => x.id === pizza.id);
  //   if (exist.hasOwnProperty("ingredients")) {
  //     // do something
  //     console.log("2");
  //   }
  //   console.log(typeof exist);
  //   if (exist) {
  //     setCartItems(
  //       cartItems.map((x) =>
  //         x.id === pizza.id ? { ...exist, qty: exist.qty + 1 } : x
  //       )
  //     );
  //   } else {
  //     setCartItems([...cartItems, { ...pizza, qty: 1 }]);
  //   }
  //   console.log(cartItems);
  // };

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
