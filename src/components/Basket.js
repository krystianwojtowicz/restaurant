import { useContext, useState } from "react";
import { OrderContext } from "./OrderContext";

function Basket(props) {
  const { cartItems, setCartItems } = useContext(OrderContext);
  const { order, setOrder } = useContext(OrderContext);
  const [customerName, setCustomerName] = useState("");

  const removeAllPizzasOfOneKind = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty !== 0) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrder({ ...cartItems, customerName });
  };
  console.log(order);
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setCustomerName(e.target.value)}
          name="customerName"
          value={customerName}
          required
        />
        <button type="submit">submit</button>
      </form>
      {/* name, address, date, mail, phone, what */}
    </main>
  );
}

export default Basket;
