import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

function List() {
  const [pizzas, setPizzas] = useState([]);
  const pizzasCollectionRef = collection(db, "meals");

  useEffect(() => {
    console.log(process.env);
    const getPizzas = async () => {
      const data = await getDocs(pizzasCollectionRef);
      setPizzas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPizzas();
  }, []);
  return (
    <div>
      {pizzas.map((pizza) => {
        return (
          <div key={pizza.id}>
            <h1>name: {pizza.name}</h1>
            <h1>ingredients: {pizza.ingredients.join(",")}</h1>
            <h1>price: {pizza.price}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default List;
