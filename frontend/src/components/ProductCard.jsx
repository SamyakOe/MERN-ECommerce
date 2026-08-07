import { NavLink } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <NavLink to={`/product/${product._id}`}>
      <div className="group flex flex-col h-130 cursor-pointer hover:shadow-2xl overflow-hidden">
        <div className="h-90 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition group-hover:scale-105 ease-in-out duration-300"
          />
        </div>
        <div className="flex flex-col p-6 gap-2">
          <span className="text-gray-500 uppercase text-sm">
            {product.category}
          </span>
          <span className=" capitalize text-base font-medium">
            {product.title}
          </span>
          <span className=" capitalize text-lg font-semibold">
            Rs. {product.price}
          </span>
        </div>
      </div>
    </NavLink>
  );
}

export default ProductCard;
