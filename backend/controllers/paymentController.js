import crypto from "crypto";
import Order from "../models/Order.js";

// Helper function to generate HMAC-SHA256 Signature for eSewa v2
export const generateEsewaSignature = (secretKey, totalAmount, transactionUuid, productCode) => {
  // Ensure inputs are trimmed to avoid hidden whitespace issues
  const cleanKey = secretKey?.trim();
  const dataString = `total_amount=${totalAmount.trim()},transaction_uuid=${transactionUuid.trim()},product_code=${productCode.trim()}`;
  const hmac = crypto.createHmac("sha256", cleanKey);
  hmac.update(dataString);
  const signature = hmac.digest("base64");
  return signature;
};

// Initiate eSewa payment (Returns signature and form params)
export const initiateEsewaPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized for this order" });
    }

    const merchantCode = process.env.ESEWA_PRODUCT_CODE;
    const secretKey = process.env.ESEWA_SECRET_KEY;
    const esewaUrl = process.env.ESEWA_PAYMENT_URL;
    const frontendUrl = process.env.FRONTEND_URL;

    // Ensure transactionUuid exists
    if (!order.transactionUuid) {
      order.transactionUuid = `ORDER-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      await order.save();
    }

    // Use raw numeric values without extra formatting to match eSewa expectations
    const totalAmount = Math.round(order.totalPrice).toString();
    const amount = Math.round(order.itemsPrice).toString();
    const taxAmount = Math.round(order.taxPrice).toString();

    const signature = generateEsewaSignature(
      secretKey,
      totalAmount,
      order.transactionUuid,
      merchantCode
    );

    const esewaData = {
      amount: amount,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      transaction_uuid: order.transactionUuid,
      product_code: merchantCode,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: `${frontendUrl}/payment/esewa/success`,
      failure_url: `${frontendUrl}/checkout`,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature: signature,
      esewa_url: esewaUrl,
    };

    res.json({ success: true, esewaData, orderId: order._id });
  } catch (error) {
    console.error("eSewa initiation error:", error);
    res.status(500).json({ message: "Failed to initiate eSewa payment", error: error.message });
  }
};

// Verify eSewa Payment Callback Response
export const verifyEsewaPayment = async (req, res) => {
  try {
    const { encodedData } = req.body;

    if (!encodedData) {
      return res.status(400).json({ message: "Missing response payload data" });
    }

    // Decode Base64 response data from eSewa
    const decodedString = Buffer.from(encodedData, "base64").toString("utf-8");
    const decodedData = JSON.parse(decodedString);

    const {
      status,
      signature,
      transaction_uuid,
      total_amount,
    } = decodedData;

    if (status !== "COMPLETE") {
      return res.status(400).json({ message: "Payment was not completed", status });
    }

    // Find corresponding order
    const order = await Order.findOne({ transactionUuid: transaction_uuid });

    if (!order) {
      return res.status(404).json({ message: "Order not found for transaction UUID" });
    }

    // Validate total amount matches order
    if (parseFloat(total_amount) !== order.totalPrice) {
      return res.status(400).json({ message: "Payment amount mismatch" });
    }

    // Mark order as paid
    order.paymentStatus = "Paid";
    order.paymentMethod = "eSewa";
    order.status = "Processing";
    await order.save();

    res.json({
      success: true,
      message: "Payment verified successfully",
      orderId: order._id,
      order,
    });
  } catch (error) {
    console.error("eSewa verification error:", error);
    res.status(500).json({ message: "Payment verification failed", error: error.message });
  }
};

// Initiate Khalti payment v2
export const initiateKhaltiPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized for this order" });
    }

    const frontendUrl = process.env.FRONTEND_URL ;
    const khaltiSecretKey = process.env.KHALTI_SECRET_KEY ;
    const khaltiUrl = `${process.env.KHALTI_GATEWAY_URL}/initiate/`;

    // Amount in paisa (1 NPR = 100 Paisa)
    const amountInPaisa = Math.round(order.totalPrice * 100);

    const payload = {
      return_url: `${frontendUrl}/payment/khalti/success`,
      website_url: frontendUrl,
      amount: amountInPaisa,
      purchase_order_id: order._id.toString(),
      purchase_order_name: `Order #${order.orderId || order._id}`,
      customer_info: {
        name: order.shippingAddress?.fullName || "Customer",
        phone: order.shippingAddress?.phone || "9800000000",
      },
    };

    const response = await fetch(khaltiUrl, {
      method: "POST",
      headers: {
        Authorization: khaltiSecretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.pidx) {
      console.error("Khalti initiation failed:", data);
      return res.status(400).json({
        message: data.detail || "Failed to initiate Khalti payment",
        error: data,
      });
    }

    // Save pidx to order
    order.pidx = data.pidx;
    order.paymentMethod = "Khalti";
    await order.save();

    res.json({
      success: true,
      payment_url: data.payment_url,
      pidx: data.pidx,
      orderId: order._id,
    });
  } catch (error) {
    console.error("Khalti initiation error:", error);
    res.status(500).json({ message: "Failed to initiate Khalti payment", error: error.message });
  }
};

// Verify Khalti Payment Lookup
export const verifyKhaltiPayment = async (req, res) => {
  try {
    const { pidx } = req.body;

    if (!pidx) {
      return res.status(400).json({ message: "Missing pidx parameter" });
    }

    const khaltiSecretKey = process.env.KHALTI_SECRET_KEY || "Key 82e56e01a0cb4d9bb933ad5fb1a9386c";
    const lookupUrl = `${process.env.KHALTI_GATEWAY_URL || "https://a.khalti.com/api/v2/epayment"}/lookup/`;

    const response = await fetch(lookupUrl, {
      method: "POST",
      headers: {
        Authorization: khaltiSecretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pidx }),
    });

    const data = await response.json();

    if (!response.ok || data.status !== "Completed") {
      return res.status(400).json({
        message: data.detail || `Khalti payment status is ${data.status || "Failed"}`,
        data,
      });
    }

    // Find order by pidx or purchase_order_id
    const order = await Order.findOne({
      $or: [{ pidx: pidx }, { _id: data.purchase_order_id }],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found for Khalti transaction" });
    }

    // Update order status
    order.paymentStatus = "Paid";
    order.paymentMethod = "Khalti";
    order.status = "Processing";
    order.pidx = data.pidx;
    await order.save();

    res.json({
      success: true,
      message: "Khalti payment verified successfully",
      orderId: order._id,
      order,
    });
  } catch (error) {
    console.error("Khalti verification error:", error);
    res.status(500).json({ message: "Khalti verification failed", error: error.message });
  }
};
