import { format } from "date-fns";
import { ChevronDown, Package, ChevronUp, MapPin } from "lucide-react";
import renderStatus from "../utils/renderStatus";
import { useState } from "react";

export default function OrderAccordian({ order }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div key={order._id} className="border border-neutral-200 rounded-2xl p-4 shadow my-4 hover:cursor-pointer hover:bg-neutral-50 transition-all duration-300">
            <div
                onClick={() => setExpanded(!expanded)}
                className="  flex gap-4 items-center justify-between w-full ">
                <div className="flex gap-4 items-center">

                    <div className="p-4 bg-neutral-100 rounded-xl h-fit w-fit ">
                        <Package className="size-4 text-neutral-500" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-medium text-sm">#{order.orderId}</span>
                        <div className="flex gap-4 items-center">
                            <span className="text-neutral-500 text-xs font-medium">{format(new Date(order.createdAt), 'MMM d, yyyy')}</span>
                            <span className="text-neutral-500 text-xs font-medium">{order.items.length} item{order.items.length > 1 ? "s" : ""}</span>
                        </div>
                    </div>
                    <div>{renderStatus(order.status)}</div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {order.paymentMethod || "COD"} • {order.paymentStatus || "Pending"}
                    </span>
                </div>

                <div className="flex  items-center gap-4">
                    <span className="font-bold text-base">
                        Rs {order.totalPrice.toFixed(2)}
                    </span>
                    {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </div>
            </div>
            {expanded && (
                <div className="">

                    {order.items.map(item => (
                        <div key={item.productId} className="border-neutral-200 border-t flex items-center justify-between my-2 py-2 gap-4">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.title} className="size-16 rounded-2xl" />
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold text-sm">{item.title}</span>
                                    <span className="text-xs text-neutral-500 font-semibold">Quantity: {item.quantity}</span>
                                </div>
                            </div>
                            <span className="font-semibold">Rs {item.price.toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex border-neutral-200 border-t py-2">
                        <div className="bg-neutral-100 rounded-2xl w-full p-3 flex items-center gap-3">
                            <MapPin className="size-4 text-neutral-400" />
                            <div className="flex flex-col gap-2">
                                <span className="font-medium text-xs text-neutral-500">Delivery Address</span>
                                <span className="text-xs text-neutral-600">
                                    {order.shippingAddress.address}, {order.shippingAddress.area}, {order.shippingAddress.city}
                                </span>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col border-neutral-200 border-t py-2 gap-2">
                        <div className="flex justify-between text-sm  text-neutral-500 pt-2">
                            <span>Subtotal</span>
                            <span>Rs {order.itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm  text-neutral-500 pb-2">
                            <span>Tax (13%)</span>
                            <span>Rs {order.taxPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-base pt-2 font-semibold  text-black border-t border-neutral-200">
                            <span>Total</span>
                            <span>Rs {order.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}