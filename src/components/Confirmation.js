import { useContext } from "react";
import { OrderContext } from "./OrderContext";

function Confirmation() {
  const { order, setOrder } = useContext(OrderContext);
  console.warn(order);
  return (
    <main>
      <h1>Confirmation</h1>
      {order.customerName ? (
        <div>
          <h2>customer's name: {order.customerName}</h2>
          <h2>street: {order.street}</h2>
          <h2>city: {order.city}</h2>
          <h2>number of street: {order.numberOfStreet}</h2>
          {order.numberOfFlat ? (
            <h2>number of flat: {order.numberOfFlat}</h2>
          ) : null}
          <h2>hour of delivery: {order.date}</h2>
          <h2>e-mail: {order.email}</h2>
          <h2>phone: {order.phone}</h2>
        </div>
      ) : (
        <p>fill out the form first</p>
      )}
    </main>
  );
}

export default Confirmation;
