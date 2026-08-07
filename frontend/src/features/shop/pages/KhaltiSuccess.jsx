import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function KhaltiSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // 'verifying' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const pidx = searchParams.get("pidx");

    if (!pidx) {
      setStatus("error");
      setErrorMessage("No transaction ID (pidx) provided.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await api.post("/payment/khalti/verify", { pidx });

        if (response.data.success) {
          setStatus("success");
          window.dispatchEvent(new Event("cartUpdated"));

          setTimeout(() => {
            navigate(`/order-confirmation/${response.data.orderId}`, {
              state: { order: response.data.order },
            });
          }, 1500);
        } else {
          setStatus("error");
          setErrorMessage(response.data.message || "Khalti payment verification failed.");
        }
      } catch (err) {
        console.error("Khalti verification error:", err);
        setStatus("error");
        setErrorMessage(
          err.response?.data?.message || "Failed to verify Khalti payment."
        );
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {status === "verifying" && (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-12 animate-spin text-purple-600" />
          <h2 className="text-xl font-semibold text-neutral-800">
            Verifying Khalti Payment...
          </h2>
          <p className="text-neutral-500 text-sm">
            Please wait while we confirm your transaction with Khalti.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center gap-4">
          <CheckCircle2 className="size-16 text-purple-600 animate-bounce" />
          <h2 className="text-2xl font-bold text-neutral-900">
            Payment Successful!
          </h2>
          <p className="text-neutral-600 text-sm">
            Redirecting to your order confirmation...
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <XCircle className="size-16 text-red-500" />
          <h2 className="text-2xl font-bold text-neutral-900">
            Khalti Payment Failed
          </h2>
          <p className="text-neutral-600 text-sm">{errorMessage}</p>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 bg-black text-white px-6 py-2 rounded-xl hover:bg-neutral-800 transition-colors"
          >
            Back to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
