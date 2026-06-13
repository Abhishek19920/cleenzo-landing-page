import { useState } from "react";
import { BUSINESS_TYPES, MONTHLY_VOLUMES } from "../data";
import { submitCommercialLead } from "../submitLead";

const emptyForm = {
  business_name: "",
  contact_person: "",
  mobile: "",
  email: "",
  business_type: "",
  monthly_volume: "",
  pickup_address: "",
  requirement_details: "",
};

function CommercialEnquiryForm() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.business_name.trim() ||
      !form.contact_person.trim() ||
      !form.mobile.trim() ||
      !form.business_type ||
      !form.pickup_address.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const digits = form.mobile.replace(/\D/g, "").slice(-10);
    if (digits.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      await submitCommercialLead({ ...form, mobile: digits });
      setForm(emptyForm);
      setSuccess(true);
      window.setTimeout(() => setSuccess(false), 6000);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="commercial-enquiry" className="scroll-mt-36 bg-slate-50 py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-[#0A3D91] text-center mb-2">
          Commercial Enquiry
        </h2>
        <p className="text-slate-600 text-center mb-8">
          Tell us about your business — our commercial team will tailor a program for you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 mb-1 block">Business Name *</span>
              <input
                required
                value={form.business_name}
                onChange={(e) => update("business_name", e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]/40"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 mb-1 block">Contact Person *</span>
              <input
                required
                value={form.contact_person}
                onChange={(e) => update("contact_person", e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]/40"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 mb-1 block">Mobile Number *</span>
              <input
                required
                type="tel"
                value={form.mobile}
                onChange={(e) => update("mobile", e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]/40"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 mb-1 block">Email Address</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]/40"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 mb-1 block">Business Type *</span>
              <select
                required
                value={form.business_type}
                onChange={(e) => update("business_type", e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]/40 bg-white"
              >
                <option value="">Select type</option>
                {BUSINESS_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 mb-1 block">Monthly Laundry Volume</span>
              <select
                value={form.monthly_volume}
                onChange={(e) => update("monthly_volume", e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]/40 bg-white"
              >
                <option value="">Select volume</option>
                {MONTHLY_VOLUMES.map((vol) => (
                  <option key={vol} value={vol}>{vol}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 mb-1 block">Pickup Address *</span>
            <textarea
              required
              rows={3}
              value={form.pickup_address}
              onChange={(e) => update("pickup_address", e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]/40 resize-y"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 mb-1 block">Requirement Details</span>
            <textarea
              rows={3}
              value={form.requirement_details}
              onChange={(e) => update("requirement_details", e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A3D91]/40 resize-y"
            />
          </label>

          {error && (
            <p className="text-red-600 text-sm font-semibold bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0A3D91] text-white font-bold py-4 rounded-xl hover:bg-[#072d6b] transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Request Commercial Quote"}
          </button>
        </form>

        {success && (
          <div
            role="status"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white font-semibold px-6 py-4 rounded-xl shadow-lg max-w-md text-center"
          >
            Thank you! Our commercial team will contact you shortly.
          </div>
        )}
      </div>
    </section>
  );
}

export default CommercialEnquiryForm;
