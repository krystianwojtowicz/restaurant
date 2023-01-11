import { useContext } from "react";
import { OrderContext } from "./OrderContext";

function Basket(props) {
  const { cartItems, setCartItems } = useContext(OrderContext);

  const removeAllPizzasOfOneKind = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty !== 0) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    }
  };

  return (
    <main>
      <div>
        <h1>your cart</h1>
        {cartItems.length === 0 && <div>Cart is Empty</div>}
        {cartItems.map((item) => (
          <div key={item.id}>
            <div>
              <h4>{item.name}</h4>
              <h5>${item.price}</h5>
            </div>
            <div>
              <i
                className="fas fa-trash"
                onClick={() => removeAllPizzasOfOneKind(item)}
              ></i>
              <i
                className="fas fa-chevron-up"
                onClick={() => props.addPizza(item)}
              ></i>
              <p>
                {item.qty} x ${item.price.toFixed(2)}
              </p>
              <i
                onClick={() => props.removePizza(item)}
                className="fas fa-chevron-down"
              ></i>
            </div>
          </div>
        ))}
      </div>
      <button>order</button>
      {/* name, address, date, mail, phone, what */}
    </main>
  );
}

export default Basket;
