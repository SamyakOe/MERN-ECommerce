import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../api/axios';

const ProductContext = createContext();

export const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { products: action.payload };
    case 'CREATE_PRODUCT':
      return { products: [action.payload, ...state.products] };
    case 'UPDATE_PRODUCT':
      return {
        products: state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        products: state.products.filter((p) => p._id !== action.payload),
      };
    default:
      return state;
  }
};

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get("/products/");
        dispatch({ type: 'SET_PRODUCTS', payload: response.data.products });
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }} >
      {children}
    </ProductContext.Provider>
  );
}

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used inside a ProductProvider');
  }
  return context;
};

