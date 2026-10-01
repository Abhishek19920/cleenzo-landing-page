import { useEffect } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "../constants";
import { openWhatsAppBooking } from "../whatsapp";

export function buildManualBookingWhatsApp(form) {
  return [
    "Hi Cleenzo, I tried to book a pickup on the website.",
    "This pincode is outside auto-serve — please take a manual booking if you can serve this area.",
    "",
    `Name: ${form.fullName || "-"}`,
    `Phone: ${form.phone || "-"}`,
    `City: ${form.city || "-"}`,
    `Address: ${form.addressLine || "-"}`,
    `Pincode: ${form.pincode || "-"}`,
  ].join("\n");
}

/**
 * Shown when distance/serviceability check fails.
 * Customer must try once by calling the store (9999225311). Store decides
 * whether to accept the booking.
 */
function ManualStoreBookingPopup({
  form,
  onClose,
  onSendToStore,
  sending,
  sent,
  sendError,
}) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[420] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manual-booking-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 h-9 w-9 rounded-full bg-black/10 text-lg font-bold text-slate-700 hover:bg-black/20"
          aria-label="Close"
        >
          ×
        </button>

        <div className="bg-gradient-to-r from-cleenzo-deeper via-cleenzo-deep to-cleenzo px-6 py-8 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-cleenzo-sky">
            Outside auto-serve area
          </p>
          <h2 id="manual-booking-title" className="mt-2 text-2xl font-black leading-tight">
            Try once with our store number
          </h2>
          <p className="mt-3 text-sm font-medium text-white/90">
            Call {PHONE_DISPLAY}. If the store can serve your area, they will take the booking.
          </p>
        </div>

        <div className="space-y-3 px-6 py-6">
          {sent ? (
            <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 space-y-1">
              <p>Request {sent.pickupNumber} is with the store.</p>
              <p>
                Please call{" "}
                <a href={`tel:${PHONE_TEL}`} className="font-bold underline">
                  {PHONE_DISPLAY}
                </a>{" "}
                once so they can confirm or decline.
              </p>
            </div>
          ) : null}
          {sendError ? (
            <p className="text-sm font-medium text-red-600" role="alert">
              {sendError}
            </p>
          ) : null}

          <a
            href={`tel:${PHONE_TEL}`}
            className="flex w-full flex-col items-center justify-center rounded-xl bg-cleenzo py-4 text-white hover:bg-cleenzo-dark"
          >
            <span className="text-base font-bold">Call store now</span>
            <span className="mt-0.5 text-lg font-black tracking-wide">
              {PHONE_DISPLAY}
            </span>
          </a>

          {!sent ? (
            <button
              type="button"
              onClick={onSendToStore}
              disabled={sending}
              className="w-full rounded-xl border-2 border-cleenzo/30 bg-cleenzo-pale/40 py-3.5 font-bold text-cleenzo-deep hover:bg-cleenzo-pale disabled:opacity-60"
            >
              {sending
                ? "Sending to store…"
                : "Send my details — store will decide"}
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => openWhatsAppBooking(buildManualBookingWhatsApp(form))}
            className="w-full rounded-xl bg-[#25D366] py-3.5 font-bold text-white hover:bg-[#1fb855]"
          >
            WhatsApp the store
          </button>

          <p className="text-center text-xs leading-relaxed text-slate-500">
            Online booking is not auto-confirmed for this pincode. A short call
            to {PHONE_DISPLAY} lets the store accept the pickup if they can
            serve you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ManualStoreBookingPopup;
