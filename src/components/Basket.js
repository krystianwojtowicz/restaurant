import { useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { OrderContext } from "./OrderContext";
import Input from "./Input";
// import Select from "react-select";

const defaultData = {
  customerName: "",
  street: "",
  city: "",
  numberOfStreet: "",
  numberOfFlat: "",
  date: "11:30",
  email: "",
  phone: 0,
};

function Basket(props) {
  const { cartItems, setCartItems } = useContext(OrderContext);
  const { order, setOrder } = useContext(OrderContext);
  const [formValues, setFormValues] = useState(defaultData);
  const [isSubmit, setIsSubmit] = useState(false);
  const ordersCollectionRef = collection(db, "orders");

  const removeAllPizzasOfOneKind = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty !== 0) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOrder({ ...cartItems, ...formValues });
    setIsSubmit(true);
  };
  const addOrder = async () => {
    await addDoc(ordersCollectionRef, order);
  };
  useEffect(() => {
    if (isSubmit) {
      addOrder();
      setIsSubmit(false);
      // remove last line
    }
  }, [isSubmit]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    console.log(formValues);
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
        <Input
          type="text"
          placeholder="name"
          onChange={handleChange}
          name="customerName"
          value={formValues.customerName}
          required
        ></Input>
        <Input
          type="text"
          placeholder="city"
          onChange={handleChange}
          name="city"
          value={formValues.city}
          required
        ></Input>
        <Input
          value={formValues.street}
          onChange={handleChange}
          name="street"
          type="text"
          placeholder="street"
          required
        ></Input>
        <Input
          value={formValues.numberOfStreet}
          onChange={handleChange}
          name="numberOfStreet"
          type="string"
          placeholder="number of street"
          required
        ></Input>
        <Input
          value={formValues.numberOfFlat}
          onChange={handleChange}
          name="numberOfFlat"
          type="number"
          placeholder="number of flat(optional)"
        ></Input>
        <Input
          value={formValues.date}
          onChange={handleChange}
          name="date"
          type="string"
          required
        ></Input>
        {/* <Select options={options} /> */}
        <Input
          value={formValues.email}
          onChange={handleChange}
          name="email"
          type="string"
          required
          placeholder="email"
        ></Input>
        <Input
          value={formValues.phone}
          onChange={handleChange}
          name="phone"
          type="number"
          required
          placeholder="phone"
        ></Input>
        <button type="submit">submit</button>
      </form>
    </main>
  );
}

export default Basket;
