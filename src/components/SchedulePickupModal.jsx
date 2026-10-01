import { useEffect, useRef, useState } from "react";
import CleenzoLogo from "./CleenzoLogo";
import CampaignBookingSummary from "./campaign/CampaignBookingSummary";
import { confirmWebsitePickup, fetchPickupSlots, requestManualWebsitePickup } from "../api/booking";
import { checkPincodeServiceability } from "../api/campaign";
import ManualStoreBookingPopup from "./ManualStoreBookingPopup";

const STEPS = [
  { id: 1, label: "Your Details" },
  { id: 2, label: "Services" },
  { id: 3, label: "Schedule" },
  { id: 4, label: "Confirm" },
];

const CITIES = ["Ghaziabad", "Noida", "Greater Noida"];

const SERVICES = [
  "Dry Cleaning",
  "Wash & Fold",
  "Wash & Iron",
  "Premium Laundry",
  "Steam Iron",
  "Shoe Cleaning",
  "Sofa & Curtains",
];

const BENEFITS = [
  "Free pickup from your doorstep",
  "24-hour express option available",
  "Pay only after service — no advance",
  "Live WhatsApp updates at every step",
];

const emptyForm = {
  fullName: "",
  phone: "",
  city: "",
  addressLine: "",
  pincode: "",
  services: [],
  pickupDate: "",
  pickupTimeSlot: "",
  notes: "",
};

function nationalPhone(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return digits.slice(-10);
}

function SchedulePickupModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [slots, setSlots] = useState(null);
  const [slotsError, setSlotsError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [manualOffer, setManualOffer] = useState(false);
  const [manualSending, setManualSending] = useState(false);
  const [manualSent, setManualSent] = useState(null);
  const [manualSendError, setManualSendError] = useState("");
  const requestId = useRef("");
  const manualRequestId = useRef("");

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    if (step !== 3 || slots) return undefined;
    let cancelled = false;
    setSlotsError("");
    fetchPickupSlots()
      .then((data) => {
        if (cancelled) return;
        setSlots(data);
        const first = (data.days || []).find((day) => day.bookable);
        if (first) {
          setForm((prev) => ({
            ...prev,
            pickupDate: prev.pickupDate || first.date,
          }));
        }
      })
      .catch((err) => {
        if (!cancelled) setSlotsError(err.message || "Could not load pickup slots.");
      });
    return () => {
      cancelled = true;
    };
  }, [step, slots]);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const toggleService = (service) => {
    setForm((prev) => {
      const selected = prev.services.includes(service)
        ? prev.services.filter((item) => item !== service)
        : [...prev.services, service];
      return { ...prev, services: selected };
    });
    setError("");
  };

  const validateDetails = () => {
    if (form.fullName.trim().length < 2) return "Enter your full name.";
    if (!/^[6-9]\d{9}$/.test(nationalPhone(form.phone))) {
      return "Enter a valid 10-digit WhatsApp number.";
    }
    if (!form.city) return "Select your city.";
    if (form.addressLine.trim().length < 8) return "Enter your full pickup address.";
    if (!/^\d{6}$/.test(form.pincode.trim())) return "Enter a valid 6-digit pincode.";
    return "";
  };

  const goNext = async () => {
    if (step === 1) {
      const message = validateDetails();
      if (message) {
        setError(message);
        return;
      }
      try {
        const coverage = await checkPincodeServiceability(form.pincode.trim(), {
          city: form.city,
          addressLine: form.addressLine.trim(),
        });
        if (coverage && coverage.serviceable === false) {
          setManualOffer(true);
          return;
        }
      } catch {
        /* API down — booking confirm still re-checks coverage */
      }
    }
    if (step === 2 && form.services.length === 0) {
      setError("Choose at least one service.");
      return;
    }
    if (step === 3 && (!form.pickupDate || !form.pickupTimeSlot)) {
      setError("Choose a pickup date and time slot.");
      return;
    }
    setError("");
    setStep((current) => Math.min(4, current + 1));
  };

  const confirm = async () => {
    const message = validateDetails();
    if (message || form.services.length === 0 || !form.pickupDate || !form.pickupTimeSlot) {
      setError(message || "Complete every step before confirming.");
      return;
    }
    if (!requestId.current) requestId.current = crypto.randomUUID();
    setSubmitting(true);
    setError("");
    try {
      const result = await confirmWebsitePickup({
        fullName: form.fullName.trim(),
        phone: nationalPhone(form.phone),
        city: form.city,
        addressLine: form.addressLine.trim(),
        pincode: form.pincode.trim(),
        pickupDate: form.pickupDate,
        pickupTimeSlot: form.pickupTimeSlot,
        services: form.services,
        notes: form.notes.trim() || undefined,
        clientRequestId: requestId.current,
      });
      setConfirmation(result);
    } catch (err) {
      const text = err.message || "We could not complete the booking. Please try again.";
      if (/not serving|9999225311|manual booking/i.test(text)) {
        setManualOffer(true);
        return;
      }
      setError(text);
    } finally {
      setSubmitting(false);
    }
  };

  const sendToStore = async () => {
    const message = validateDetails();
    if (message) {
      setManualSendError(message);
      return;
    }
    if (!manualRequestId.current) manualRequestId.current = crypto.randomUUID();
    setManualSending(true);
    setManualSendError("");
    try {
      const result = await requestManualWebsitePickup({
        fullName: form.fullName.trim(),
        phone: nationalPhone(form.phone),
        city: form.city,
        addressLine: form.addressLine.trim(),
        pincode: form.pincode.trim(),
        notes: form.notes.trim() || undefined,
        clientRequestId: manualRequestId.current,
      });
      setManualSent(result);
    } catch (err) {
      setManualSendError(
        err.message || "Could not send to store. Please call 9999225311.",
      );
    } finally {
      setManualSending(false);
    }
  };

  const selectedDay = slots?.days?.find((day) => day.date === form.pickupDate);

  return (
    <div
      className="fixed inset-0 z-[300] bg-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pickup-modal-title"
    >
      <div className="flex h-full min-h-0 flex-col lg:flex-row">
        <aside className="relative flex shrink-0 flex-col justify-between bg-gradient-to-b from-cleenzo-deep to-cleenzo px-6 py-6 text-white lg:w-[340px] lg:px-8 lg:py-8">
          <div>
            <div className="flex items-center justify-between">
              <CleenzoLogo className="h-9 w-auto" width={120} height={40} />
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-3 py-1 text-sm text-white/80 hover:bg-white/10 lg:hidden"
              >
                Close
              </button>
            </div>
            <h2 id="pickup-modal-title" className="mt-8 text-3xl font-black leading-tight lg:mt-16 lg:text-4xl">
              Book Your Free Pickup.
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/85">
              Takes 2 minutes. We’ll confirm within 30 minutes. Free pickup, free delivery.
            </p>
            <ul className="mt-6 hidden space-y-3 text-sm lg:block">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="flex min-h-0 flex-1 flex-col bg-cleenzo-pale-bg">
          <div className="flex items-center justify-between px-5 py-4 text-sm text-slate-500 sm:px-10">
            <span>Free pickup · No payment now</span>
            <button
              type="button"
              onClick={onClose}
              className="hidden rounded-full px-3 py-1 hover:bg-white lg:inline"
              aria-label="Close booking"
            >
              Close
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-10 sm:px-10">
            <ol className="mx-auto flex max-w-xl items-center justify-between">
              {STEPS.map((item, index) => {
                const active = step === item.id;
                const done = step > item.id || confirmation;
                return (
                  <li key={item.id} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          active || done
                            ? "bg-cleenzo text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {item.id}
                      </span>
                      <span
                        className={`mt-2 text-center text-xs font-semibold ${
                          active ? "text-cleenzo" : "text-slate-500"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {index < STEPS.length - 1 ? (
                      <span
                        className={`mx-2 mb-5 h-0.5 flex-1 ${
                          step > item.id ? "bg-cleenzo" : "bg-slate-200"
                        }`}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ol>

            <div className="mx-auto mt-8 max-w-xl">
              {confirmation ? (
                <Confirmation confirmation={confirmation} form={form} onClose={onClose} />
              ) : (
                <>
                  {step === 1 ? (
                    <DetailsStep form={form} setField={setField} />
                  ) : null}
                  {step === 2 ? (
                    <ServicesStep form={form} toggleService={toggleService} />
                  ) : null}
                  {step === 3 ? (
                    <ScheduleStep
                      form={form}
                      setField={setField}
                      days={slots?.days || []}
                      selectedDay={selectedDay}
                      slotsError={slotsError}
                    />
                  ) : null}
                  {step === 4 ? <ConfirmStep form={form} setField={setField} /> : null}

                  {error ? (
                    <p className="mt-4 text-sm font-medium text-red-600" role="alert">
                      {error}
                    </p>
                  ) : null}

                  <div className="mt-6 flex gap-3">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setError("");
                          setStep((current) => current - 1);
                        }}
                        className="rounded-2xl border border-slate-200 bg-white px-5 py-4 font-semibold text-slate-700"
                      >
                        Back
                      </button>
                    ) : null}
                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={goNext}
                        className="flex-1 rounded-2xl bg-cleenzo py-4 text-base font-bold text-white hover:bg-cleenzo-dark"
                      >
                        {step === 1 ? "Continue to Services →" : "Continue →"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={confirm}
                        disabled={submitting}
                        className="flex-1 rounded-2xl bg-cleenzo py-4 text-base font-bold text-white hover:bg-cleenzo-dark disabled:opacity-60"
                      >
                        {submitting ? "Confirming…" : "Confirm booking"}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      {manualOffer ? (
        <ManualStoreBookingPopup
          form={form}
          sending={manualSending}
          sent={manualSent}
          sendError={manualSendError}
          onSendToStore={sendToStore}
          onClose={() => {
            setManualOffer(false);
            setManualSendError("");
          }}
        />
      ) : null}
    </div>
  );
}

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-800">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-cleenzo/30";

function DetailsStep({ form, setField }) {
  return (
    <div>
      <h3 className="text-3xl font-black text-slate-900">Your Details</h3>
      <p className="mt-2 text-sm text-slate-500">
        We’ll use this to schedule your pickup and send updates.
      </p>
      <div className="mt-6 space-y-4">
        <Field id="pickup-name" label="Full Name *">
          <input
            id="pickup-name"
            value={form.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            autoComplete="name"
            className={inputClass}
          />
        </Field>
        <Field id="pickup-phone" label="WhatsApp Number *">
          <input
            id="pickup-phone"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91"
            className={inputClass}
          />
        </Field>
        <Field id="pickup-city" label="City *">
          <select
            id="pickup-city"
            value={form.city}
            onChange={(e) => setField("city", e.target.value)}
            className={inputClass}
          >
            <option value="">Select your city</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </Field>
        <Field id="pickup-address" label="Full Address *">
          <textarea
            id="pickup-address"
            value={form.addressLine}
            onChange={(e) => setField("addressLine", e.target.value)}
            rows={3}
            placeholder="Flat/House no., Building, Society, Sector..."
            className={`${inputClass} resize-none`}
          />
        </Field>
        <Field id="pickup-pincode" label="Pincode *">
          <input
            id="pickup-pincode"
            value={form.pincode}
            onChange={(e) => setField("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            autoComplete="postal-code"
            className={inputClass}
          />
        </Field>
        <p className="text-xs text-slate-500 sm:col-span-2">
          We check your pincode against Cleenzo&apos;s doorstep coverage. Outside
          areas can still try a manual booking by calling the store.
        </p>
      </div>
    </div>
  );
}

function ServicesStep({ form, toggleService }) {
  return (
    <div>
      <h3 className="text-3xl font-black text-slate-900">Services</h3>
      <p className="mt-2 text-sm text-slate-500">
        Tell us what you want collected. Pricing is confirmed after inspection.
      </p>
      <div className="mt-6 grid gap-3">
        {SERVICES.map((service) => {
          const selected = form.services.includes(service);
          return (
            <button
              key={service}
              type="button"
              onClick={() => toggleService(service)}
              aria-pressed={selected}
              className={`rounded-2xl border px-4 py-4 text-left text-base font-semibold ${
                selected
                  ? "border-cleenzo bg-white text-cleenzo"
                  : "border-slate-200 bg-white text-slate-800"
              }`}
            >
              {service}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScheduleStep({ form, setField, days, selectedDay, slotsError }) {
  return (
    <div>
      <h3 className="text-3xl font-black text-slate-900">Schedule</h3>
      <p className="mt-2 text-sm text-slate-500">Pick a doorstep collection slot.</p>
      {slotsError ? (
        <p className="mt-4 text-sm font-medium text-red-600">{slotsError}</p>
      ) : null}
      {!days.length && !slotsError ? (
        <p className="mt-4 text-sm text-slate-500">Loading available slots…</p>
      ) : null}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day.date}
            type="button"
            disabled={!day.bookable}
            onClick={() => {
              setField("pickupDate", day.date);
              setField("pickupTimeSlot", "");
            }}
            className={`min-w-[92px] rounded-2xl border px-3 py-3 text-sm font-semibold ${
              form.pickupDate === day.date
                ? "border-cleenzo bg-cleenzo text-white"
                : "border-slate-200 bg-white text-slate-800 disabled:opacity-40"
            }`}
          >
            {formatDay(day.date)}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {(selectedDay?.slots || [])
          .filter((slot) => slot.bookable)
          .map((slot) => (
            <button
              key={slot.slot}
              type="button"
              onClick={() => setField("pickupTimeSlot", slot.slot)}
              className={`rounded-2xl border px-3 py-4 text-sm font-semibold ${
                form.pickupTimeSlot === slot.slot
                  ? "border-cleenzo bg-cleenzo text-white"
                  : "border-slate-200 bg-white text-slate-800"
              }`}
            >
              {slot.slot}
            </button>
          ))}
      </div>
    </div>
  );
}

function ConfirmStep({ form, setField }) {
  return (
    <div>
      <h3 className="text-3xl font-black text-slate-900">Confirm</h3>
      <p className="mt-2 text-sm text-slate-500">
        We’ll create your pickup with these details.
      </p>
      <CampaignBookingSummary />
      <dl className="mt-6 space-y-3 rounded-2xl bg-white p-5 text-sm">
        <Row label="Name" value={form.fullName} />
        <Row label="WhatsApp" value={form.phone} />
        <Row label="City" value={form.city} />
        <Row label="Address" value={form.addressLine} />
        <Row label="Pincode" value={form.pincode} />
        <Row label="Services" value={form.services.join(", ")} />
        <Row label="Pickup" value={`${formatDay(form.pickupDate)} · ${form.pickupTimeSlot}`} />
      </dl>
      <div className="mt-4">
        <Field id="pickup-notes" label="Pickup notes">
          <textarea
            id="pickup-notes"
            value={form.notes}
            onChange={(e) => setField("notes", e.target.value)}
            rows={3}
            placeholder="Gate code, landmark, or what to collect"
            className={`${inputClass} resize-none`}
          />
        </Field>
      </div>
    </div>
  );
}

function Confirmation({ confirmation, form, onClose }) {
  return (
    <div>
      <h3 className="text-3xl font-black text-slate-900">Pickup booked</h3>
      <p className="mt-2 text-sm text-slate-500">
        Booking {confirmation.pickupNumber} is in the Cleenzo pickup queue.
      </p>
      <dl className="mt-6 space-y-3 rounded-2xl bg-white p-5 text-sm">
        <Row label="Booking ID" value={confirmation.pickupNumber} />
        <Row label="Name" value={confirmation.customerName || form.fullName} />
        <Row label="WhatsApp" value={confirmation.customerPhone || form.phone} />
        <Row label="Address" value={confirmation.addressLine || form.addressLine} />
        <Row label="City" value={confirmation.city || form.city} />
        <Row label="Pincode" value={confirmation.pincode || form.pincode} />
        <Row
          label="Pickup"
          value={`${confirmation.pickupDate || form.pickupDate} · ${confirmation.pickupTimeSlot || form.pickupTimeSlot}`}
        />
      </dl>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 w-full rounded-2xl bg-cleenzo py-4 text-base font-bold text-white"
      >
        Done
      </button>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-semibold text-slate-900">{value}</dd>
    </div>
  );
}

function formatDay(ymd) {
  if (!ymd) return "";
  const date = new Date(`${ymd}T00:00:00`);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

export default SchedulePickupModal;
