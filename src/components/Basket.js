import { useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { OrderContext } from "./OrderContext";
import Input from "./Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone";
// import Select from "react-select";

function Basket(props) {
  const formik = useFormik({
    initialValues: {
      customerName: "",
      city: "",
      street: "",
      numberOfStreet: "",
      numberOfFlat: "",
      date: "11:30",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      customerName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      city: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      street: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      numberOfStreet: Yup.string()
        .max(15, "Must be 5 characters or less")
        .required("Required"),
      numberOfFlat: Yup.number().min(1, "Min value 1."),
      email: Yup.string().email().required("Required"),
      phone: Yup.string().phone("PL").required("Required"),
    }),
    onSubmit: (values) => {
      setOrder({ ...cartItems, ...values });
      // await addDoc(props.pizzasCollectionRef, order);
      setIsSubmit(true);
      // console.warn(values);
    },
  });
  // console.warn(formik.errors);
  const { cartItems, setCartItems } = useContext(OrderContext);
  const { order, setOrder } = useContext(OrderContext);
  const [isSubmit, setIsSubmit] = useState(false);
  const ordersCollectionRef = collection(db, "orders");

  const removeAllPizzasOfOneKind = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty !== 0) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    }
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
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          placeholder="name"
          onChange={formik.handleChange}
          name="customerName"
          value={formik.values.customerName}
          onBlur={formik.handleBlur}
        ></Input>
        {formik.touched.customerName && formik.errors.customerName ? (
          <p>{formik.errors.customerName}</p>
        ) : null}
        <Input
          type="text"
          placeholder="city"
          onChange={formik.handleChange}
          name="city"
          value={formik.values.city}
          onBlur={formik.handleBlur}
        ></Input>
        {formik.touched.city && formik.errors.city ? (
          <p>{formik.errors.city}</p>
        ) : null}
        <Input
          value={formik.values.street}
          onChange={formik.handleChange}
          name="street"
          type="text"
          placeholder="street"
          onBlur={formik.handleBlur}
        ></Input>
        {formik.touched.street && formik.errors.street ? (
          <p>{formik.errors.street}</p>
        ) : null}
        <Input
          value={formik.values.numberOfStreet}
          onChange={formik.handleChange}
          name="numberOfStreet"
          type="string"
          placeholder="number of street"
          onBlur={formik.handleBlur}
        ></Input>
        {formik.touched.numberOfStreet && formik.errors.numberOfStreet ? (
          <p>{formik.errors.numberOfStreet}</p>
        ) : null}
        <Input
          value={formik.values.numberOfFlat}
          onChange={formik.handleChange}
          name="numberOfFlat"
          type="number"
          placeholder="number of flat(optional)"
          onBlur={formik.handleBlur}
        ></Input>
        {formik.touched.numberOfFlat && formik.errors.numberOfFlat ? (
          <p>{formik.errors.numberOfFlat}</p>
        ) : null}
        {/* <Input
          value={formik.values.date}
          onChange={formik.handleChange}
          name="date"
          type="string"
          onBlur={formik.handleBlur}
        ></Input>
        {formik.touched.date && formik.errors.date ? (
          <p>{formik.errors.date}</p>
        ) : null} */}
        {/* <Select options={options} /> */}
        <Input
          value={formik.values.email}
          onChange={formik.handleChange}
          name="email"
          type="string"
          placeholder="email"
          onBlur={formik.handleBlur}
        ></Input>
        {formik.touched.email && formik.errors.email ? (
          <p>{formik.errors.email}</p>
        ) : null}
        <Input
          value={formik.values.phone}
          onChange={formik.handleChange}
          name="phone"
          type="string"
          placeholder="phone"
          onBlur={formik.handleBlur}
        ></Input>
        {formik.touched.phone && formik.errors.phone ? (
          <p>{formik.errors.phone}</p>
        ) : null}
        <button type="submit">submit</button>
      </form>
    </main>
  );
}

export default Basket;
