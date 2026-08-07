import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function EsewaSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // 'verifying' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const data = searchParams.get("data");

    if (!data) {
      setStatus("error");
      setErrorMessage("No payment response data provided.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await api.post("/payment/esewa/verify", {
          encodedData: data,
        });

        if (response.data.success) {
          setStatus("success");
          // Update cart state in navbar
          window.dispatchEvent(new Event("cartUpdated"));

          // Redirect to confirmation page after a short delay
          setTimeout(() => {
            navigate(`/order-confirmation/${response.data.orderId}`, {
              state: { order: response.data.order },
            });
          }, 1500);
        } else {
          setStatus("error");
          setErrorMessage(response.data.message || "Payment verification failed.");
        }
      } catch (err) {
        console.error("eSewa verification error:", err);
        setStatus("error");
        setErrorMessage(
          err.response?.data?.message || "Failed to verify eSewa payment."
        );
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {status === "verifying" && (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-12 animate-spin text-green-600" />
          <h2 className="text-xl font-semibold text-neutral-800">
            Verifying eSewa Payment...
          </h2>
          <p className="text-neutral-500 text-sm">
            Please wait while we confirm your transaction.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center gap-4">
          <CheckCircle2 className="size-16 text-green-600 animate-bounce" />
          <h2 className="text-2xl font-bold text-neutral-900">
            Payment Successful!
          </h2>
          <p className="text-neutral-600 text-sm">
            Redirecting to order confirmation...
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <XCircle className="size-16 text-red-500" />
          <h2 className="text-2xl font-bold text-neutral-900">
            Payment Verification Failed
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
