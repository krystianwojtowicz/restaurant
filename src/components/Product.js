function Product(props) {
  const { pizza, onAdd } = props;

  return (
    <div>
      <h1>name: {pizza.name}</h1>
      <h1>ingredients: {pizza.ingredients.join(",")}</h1>
      <h1>price: {pizza.price}</h1>
      <button onClick={() => onAdd(pizza)}>order</button>
    </div>
  );
}

export default Product;
