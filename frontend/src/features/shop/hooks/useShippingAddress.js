import { useState, useEffect } from "react";
import api from "../../../api/axios";

const EMPTY_ADDRESS = {
  fullName: "",
  phone: "",
  region: "",
  city: "",
  area: "",
  address: "",
};

/**
 * Manages shipping address state: loads saved address on mount,
 * provides a change handler, and a save function.
 */
export default function useShippingAddress() {
  const [address, setAddress] = useState(EMPTY_ADDRESS);

  // Load saved address on mount
  useEffect(() => {
    const loadAddress = async () => {
      try {
        const response = await api.get("/address/get");
        if (response.data && response.data.length > 0) {
          const saved = response.data[0];
          setAddress({
            fullName: saved.fullName || "",
            phone: saved.phone || "",
            region: saved.region || "",
            city: saved.city || "",
            area: saved.area || "",
            address: saved.address || "",
          });
        }
      } catch (err) {
        // No saved address, user will fill in manually
      }
    };

    loadAddress();
  }, []);

  const handleChange = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveAddress = async () => {
    try {
      await api.post("/address/add", address);
    } catch (err) {
      console.error("Error saving address", err);
      throw new Error("Failed to save address");
    }
  };

  return { address, handleChange, saveAddress };
}
