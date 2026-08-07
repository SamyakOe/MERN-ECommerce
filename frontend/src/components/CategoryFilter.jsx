function CategoryFilter(props) {
  const categories = [
    "",
    "Hoodies",
    "Jackets",
    "Footwear",
    "T-Shirts",
    "Bottoms",
    "Accessories",
  ];

  return (
    <div className="flex gap-4 px-8 py-8">
      {categories.map((category, index) => (
        <div
          key={index}
          onClick={() => props.setCategory(category)}
          className={`border-2  px-6 py-2 cursor-pointer font-medium text-sm hover:border-black ${props.category == category ? "border-black bg-black text-white" : "text-black border-gray-300"}`}
        >
          {category == "" ? "All" : category}
        </div>
      ))}
    </div>
  );
}

export default CategoryFilter;
