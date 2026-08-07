import HeroImage from "/pexels-ron-lach-9594686.jpg";
import Hoodie from "/hoodie.jpg";
import Tshirt from "/tshirt.jpg";
import Accessories from "/accessories.jpg";
import { ArrowRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import ProductCard from "../../../components/ProductCard";
import { useProductContext } from "../../../context/ProductContext";

function HomePage() {
  const navigate = useNavigate();
  const { products } = useProductContext();
  const featuredProducts = products.filter((product) => (
    product.featured
  ));
  return (
    <div>
      <div className="relative h-[calc(100vh-4.5rem)] overflow-hidden ">
        <img
          src={HeroImage}
          alt="Hero"
          className="absolute -z-1 top-0 left-0 object-cover w-full h-full shadow-inner"
        />
        <div className="h-full flex flex-col items-start justify-center w-1/2 px-8 gap-6">
          <span className="uppercase text-5xl ">
            Step into the future of fashion
          </span>
          <span className="text">
            Discover Trendsetting Styles For Men, Women and Kids
          </span>
          <div
            onClick={() => navigate("/shop")}
            className="bg-white py-3 px-8 text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-50">
            Explore Collection
            <ArrowRight />
          </div>
        </div>
      </div>
      <div className="px-8 py-10">
        <div className="grid grid-cols-3 gap-6">
          <div className="relative cursor-pointer group">
            <NavLink to="/shop">
              <div className="overflow-hidden h-full">
                <img
                  src={Hoodie}
                  alt="hoodie"
                  className="inset-shadow-black object-cover h-full transition group-hover:scale-105 ease-in-out duration-300"
                />
              </div>
              <span className="absolute z-10 left-6 bottom-6 text-white text-2xl">
                Hoodies
              </span>
              <div className="absolute inset-0 bg-radial from-transparent to-black/30"></div>
            </NavLink>
          </div>
          <div className="relative cursor-pointer group">
            <NavLink to="/shop">
              <div className="overflow-hidden h-full">
                <img
                  src={Tshirt}
                  alt="tshirt"
                  className="inset-shadow-black object-cover h-full transition group-hover:scale-105 ease-in-out duration-300"
                />
              </div>
              <span className="absolute z-10 left-6 bottom-6 text-white text-2xl">
                T-Shirts
              </span>
              <div className="absolute inset-0 bg-radial from-transparent to-black/30"></div>
            </NavLink>
          </div>
          <div className="relative cursor-pointer group">
            <NavLink to="/shop">
              <div className="overflow-hidden h-full">
                <img
                  src={Accessories}
                  alt="accessories"
                  className="inset-shadow-black object-cover h-full transition group-hover:scale-105 ease-in-out duration-300"
                />
              </div>
              <span className="absolute z-10 left-6 bottom-6 text-white text-2xl">
                Accessories
              </span>
              <div className="absolute inset-0 bg-radial from-transparent to-black/30"></div>
            </NavLink>
          </div>
        </div>
      </div>


      {/* Featured */}
      <div className="px-8 flex flex-col gap-6 mt-16 py-10 mb-4">
        <span className="uppercase text-4xl font-semibold text-center">
          Featured Collection
        </span>
        <div className="grid grid-cols-4 gap-6 py-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <NavLink to="/shop" className="self-center">
          <div className="bg-white border-2 border-black  flex items-center gap-2 py-2 px-6 cursor-pointer hover:text-white hover:bg-black">
            View All <ArrowRight />
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default HomePage;
