import { useContext } from "react";
import { OrderContext } from "./OrderContext";

function Product(props) {
  const { cartItems, setCartItems } = useContext(OrderContext);
  const { pizza, addPizza } = props;

  return (
    <div>
      <h1>name: {pizza.name}</h1>
      <h1>ingredients: {pizza.ingredients.join(",")}</h1>
      <h1>price: {pizza.price}</h1>
      <button onClick={() => addPizza(pizza)}>add to cart</button>
    </div>
  );
}

export default Product;
