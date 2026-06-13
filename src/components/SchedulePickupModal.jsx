import { useState } from "react";
import { openWhatsAppBooking } from "../whatsapp";

const emptyForm = { name: "", phone: "", address: "" };

function SchedulePickupModal({ onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const phone = form.phone.trim();
    const address = form.address.trim();

    if (!name || !phone || !address) {
      setError("Please fill in name, phone number, and address.");
      return;
    }

    if (!/^\d{10}$/.test(phone.replace(/\D/g, "").slice(-10))) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    const message = `Hi Cleenzo! I'd like to schedule a free pickup.

Name: ${name}
Phone: ${phone}
Address: ${address}`;

    openWhatsAppBooking(message);
    setForm(emptyForm);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pickup-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-cleenzo-deep to-cleenzo text-white px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-90">Free doorstep service</p>
            <h2 id="pickup-modal-title" className="text-xl font-black">
              Schedule free pickup
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="pickup-name" className="block text-sm font-semibold text-slate-700 mb-1">
              Full name
            </label>
            <input
              id="pickup-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cleenzo/40"
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="pickup-phone" className="block text-sm font-semibold text-slate-700 mb-1">
              Mobile number
            </label>
            <input
              id="pickup-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cleenzo/40"
              autoComplete="tel"
            />
          </div>

          <div>
            <label htmlFor="pickup-address" className="block text-sm font-semibold text-slate-700 mb-1">
              Pickup address
            </label>
            <textarea
              id="pickup-address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House no., street, area, city"
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cleenzo/40 resize-none"
              autoComplete="street-address"
            />
          </div>

          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-cleenzo hover:bg-cleenzo-dark text-white font-bold py-4 rounded-2xl transition"
          >
            Confirm pickup on WhatsApp
          </button>

          <p className="text-xs text-slate-500 text-center">
            We&apos;ll open WhatsApp with your details so our team can confirm your slot.
          </p>
        </form>
      </div>
    </div>
  );
}

export default SchedulePickupModal;
