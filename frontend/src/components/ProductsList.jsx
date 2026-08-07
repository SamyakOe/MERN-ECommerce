import NoProduct from "./NoProduct";
import ProductCard from "./ProductCard";

function ProductsList(props) {
  return (
    <div>
      {props.products == 0 ? (
        <NoProduct/>
      ) : (
        <div className="grid grid-cols-4 gap-8 px-8 py-8">
          {props.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsList;
