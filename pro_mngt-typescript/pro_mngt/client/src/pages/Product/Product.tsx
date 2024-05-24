import ProductList from "./ProductList";
import AddProduct from "./AddProduct";

function Product() {
  return (
    <div className="Product">
      <AddProduct />
      <ProductList />
    </div>
  );
}

export default Product;
