function Product(props) {
  const { pizza } = props;

  return (
    <div>
      <h1>name: {pizza.name}</h1>
      <h1>ingredients: {pizza.ingredients.join(",")}</h1>
      <h1>price: {pizza.price}</h1>
    </div>
  );
}

export default Product;
