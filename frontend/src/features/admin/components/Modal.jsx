import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

function Modal({ product, setModel }) {
  return (
    <div
      onClick={setModel}
      className="h-screen  w-full fixed top-0 left-0 flex items-center justify-center z-50 bg-black/50">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white max-h-3/4  py-4 rounded-2xl w-lg h-full shadow-sm overflow-auto">
        {product == null ? <AddProduct setModel={setModel} /> : <EditProduct setModel={setModel} product={product} />}
      </div>
    </div>
  );
}

export default Modal;
