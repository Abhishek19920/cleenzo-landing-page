import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  fetchPublicOrder,
  fetchPublicOrderByToken,
  isPublicAccessToken,
  isPublicOrderNumber,
  publicInvoicePdfUrl,
} from "../api/order";

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

function formatDeliveryType(type) {
  if (!type) return null;
  return type.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

export default function OrderTrackingPage() {
  const { accessToken: routeParam = "" } = useParams();
  const { pathname } = useLocation();
  const accessToken = routeParam.trim();
  const invoiceMode = pathname.startsWith("/invoice/");
  const tokenLink = isPublicAccessToken(accessToken);
  const legacyOrderNumber = isPublicOrderNumber(accessToken);

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(tokenLink);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!tokenLink) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchPublicOrderByToken(accessToken)
      .then((data) => {
        if (!cancelled) setOrder(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load order");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [accessToken, tokenLink]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setOrder(null);
    if (!accessToken) {
      setError("Order link is missing.");
      return;
    }
    if (!phone.trim()) {
      setError("Enter your mobile number (or last 4 digits).");
      return;
    }
    setLoading(true);
    try {
      const data = await fetchPublicOrder(accessToken, phone);
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load order");
    } finally {
      setLoading(false);
    }
  }

  const pageTitle = invoiceMode ? "Your invoice" : "Order & invoice";
  const invoiceUrl = tokenLink ? publicInvoicePdfUrl(accessToken) : order?.invoiceDownloadUrl;

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:py-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-cleenzo-blue">
        Cleenzo
      </p>
      <h1 className="mt-2 font-display text-3xl text-cleenzo-deep">{pageTitle}</h1>

      {loading ? (
        <p className="mt-8 text-sm text-gray-600">Loading your order…</p>
      ) : null}

      {!loading && !order && !tokenLink ? (
        <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">
            {legacyOrderNumber ? (
              <>
                Order ID:{" "}
                <span className="font-semibold text-cleenzo-deep">{accessToken}</span>
              </>
            ) : (
              "Confirm the mobile number on this order to view details."
            )}
          </p>
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
            View order
          </button>
        </form>
      ) : null}

      {!loading && error && tokenLink && !order ? (
        <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-700" role="alert">
          {error}
        </div>
      ) : null}

      {order ? (
        <div className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-semibold text-cleenzo-deep">{order.orderNumber}</p>
          </div>
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
            {order.deliveryType ? (
              <div>
                <p className="text-gray-500">Delivery type</p>
                <p className="font-medium">{formatDeliveryType(order.deliveryType)}</p>
              </div>
            ) : null}
            <div>
              <p className="text-gray-500">Payment</p>
              <p className="font-medium">{order.paymentStatus.replace(/_/g, " ")}</p>
            </div>
          </div>

          {order.pickup ? (
            <div className="rounded-xl bg-gray-50 p-4 text-sm">
              <p className="font-semibold text-cleenzo-deep">Pickup</p>
              <p className="mt-1 text-gray-600">
                {formatDate(order.pickup.pickupDate)} · {order.pickup.pickupTimeSlot}
              </p>
              <p className="mt-1 text-gray-600">{order.pickup.addressLine}</p>
            </div>
          ) : null}

          {order.customerAddress ? (
            <div className="text-sm">
              <p className="text-gray-500">Address</p>
              <p className="font-medium">{order.customerAddress}</p>
            </div>
          ) : null}

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

          {invoiceUrl ? (
            <div className="border-t border-gray-100 pt-4">
              <a
                href={invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-lg border border-cleenzo-blue px-4 py-2.5 text-sm font-semibold text-cleenzo-blue hover:bg-cleenzo-blue/5"
              >
                {invoiceMode ? "View / download invoice PDF" : "Download invoice PDF"}
              </a>
            </div>
          ) : null}
        </div>
      ) : null}

      <p className="mt-8 text-center text-sm text-gray-500">
        <Link to="/" className="text-cleenzo-blue hover:underline">
          Back to Cleenzo home
        </Link>
      </p>
    </div>
  );
}
