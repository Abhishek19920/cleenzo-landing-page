import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPublicOrder } from "../api/order";

function formatMoney(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

export default function OrderTrackingPage() {
  const { orderNumber = "" } = useParams();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setOrder(null);
    if (!orderNumber.trim()) {
      setError("Order ID is missing from the link.");
      return;
    }
    if (!phone.trim()) {
      setError("Enter your mobile number (or last 4 digits).");
      return;
    }
    setLoading(true);
    try {
      const data = await fetchPublicOrder(orderNumber, phone);
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-cleenzo-blue">
        Cleenzo
      </p>
      <h1 className="mt-2 font-display text-3xl text-cleenzo-deep">
        Order &amp; invoice
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        Order ID:{" "}
        <span className="font-semibold text-cleenzo-deep">{orderNumber}</span>
      </p>

      {!order ? (
        <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">
            For your privacy, confirm the mobile number on this order to view
            details and invoice summary.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
              Mobile number
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="Full number or last 4 digits"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-cleenzo-blue focus:outline-none focus:ring-1 focus:ring-cleenzo-blue"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cleenzo-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-cleenzo-deep disabled:opacity-60"
          >
            {loading ? "Loading…" : "View order"}
          </button>
        </form>
      ) : (
        <div className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-semibold text-cleenzo-deep">{order.customerName}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-medium">{order.statusLabel}</p>
            </div>
            <div>
              <p className="text-gray-500">Placed</p>
              <p className="font-medium">{formatDate(order.createdAt)}</p>
            </div>
            {order.deliveryDate ? (
              <div>
                <p className="text-gray-500">Delivery</p>
                <p className="font-medium">{formatDate(order.deliveryDate)}</p>
              </div>
            ) : null}
            <div>
              <p className="text-gray-500">Payment</p>
              <p className="font-medium">{order.paymentStatus.replace(/_/g, " ")}</p>
            </div>
          </div>

          {order.lineItems?.length ? (
            <div>
              <p className="mb-2 text-sm font-semibold text-cleenzo-deep">Items</p>
              <ul className="divide-y divide-gray-100 text-sm">
                {order.lineItems.map((line, i) => (
                  <li key={`${line.itemName}-${i}`} className="flex justify-between py-2">
                    <span>
                      {line.itemName}{" "}
                      <span className="text-gray-500">× {line.quantity}</span>
                    </span>
                    <span>{formatMoney(line.lineTotal)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <dl className="space-y-1 border-t border-gray-100 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Subtotal</dt>
              <dd>{formatMoney(order.subtotal)}</dd>
            </div>
            {Number(order.discountAmount) > 0 ? (
              <div className="flex justify-between text-green-700">
                <dt>Discount</dt>
                <dd>−{formatMoney(order.discountAmount)}</dd>
              </div>
            ) : null}
            {Number(order.deliveryCharges) > 0 ? (
              <div className="flex justify-between">
                <dt className="text-gray-500">Delivery</dt>
                <dd>{formatMoney(order.deliveryCharges)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatMoney(order.totalAmount)}</dd>
            </div>
            {Number(order.paidAmount) > 0 ? (
              <div className="flex justify-between text-gray-600">
                <dt>Paid</dt>
                <dd>{formatMoney(order.paidAmount)}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-gray-500">
        <Link to="/" className="text-cleenzo-blue hover:underline">
          Back to Cleenzo home
        </Link>
      </p>
    </div>
  );
}
