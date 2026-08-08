import { useState } from "react";
import { checkPincodeServiceability } from "../../api/campaign";
import { useSchedulePickup } from "../../context/SchedulePickupContext";
import { isFreedomSaleActive } from "../../utils/freedomCampaign";

function NoidaExtensionLaunchBanner({ noida }) {
  const { openSchedulePickup } = useSchedulePickup();
  if (!noida?.launchActive || !isFreedomSaleActive()) return null;

  return (
    <section
      className="border-y border-[#138808]/15 bg-gradient-to-r from-[#fff8f0] via-white to-[#f0faf2]"
      aria-label="Noida Extension service launch"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-xl">
          <div
            className="h-1 w-16 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mb-3"
            aria-hidden="true"
          />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b45309]">
            {noida.headline}
          </p>
          <h2 className="text-xl sm:text-2xl font-black text-cleenzo-deep mt-2 leading-tight">
            {noida.subline}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            Doorstep Pickup &amp; Delivery Available — we come to you; no store visit needed.
          </p>
        </div>
        <button
          type="button"
          onClick={openSchedulePickup}
          className="shrink-0 inline-flex items-center justify-center rounded-full bg-[#138808] text-white font-black px-6 py-3 text-sm sm:text-base shadow-md hover:bg-[#0f6b06] transition-colors"
        >
          BOOK A PICKUP
        </button>
      </div>
    </section>
  );
}

function PincodeServiceabilityCheck() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);
  const apiConfigured = Boolean(process.env.REACT_APP_CLEENZO_API_URL);

  if (!apiConfigured || !isFreedomSaleActive()) return null;

  const onCheck = async (e) => {
    e.preventDefault();
    setChecking(true);
    setResult(null);
    try {
      const data = await checkPincodeServiceability(pincode);
      setResult(data);
    } catch {
      setResult({
        serviceable: false,
        message: "Could not check right now. Please book on WhatsApp.",
      });
    } finally {
      setChecking(false);
    }
  };

  return (
    <form
      onSubmit={onCheck}
      className="max-w-7xl mx-auto px-4 md:px-8 pb-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:max-w-lg"
      aria-label="Check pincode serviceability"
    >
      <label className="sr-only" htmlFor="svc-pincode">
        Pincode
      </label>
      <input
        id="svc-pincode"
        inputMode="numeric"
        maxLength={6}
        placeholder="Enter pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-cleenzo-deep focus:outline-none focus:ring-2 focus:ring-[#138808]/30"
      />
      <button
        type="submit"
        disabled={checking || pincode.length !== 6}
        className="rounded-xl bg-cleenzo-deep text-white font-bold px-4 py-2.5 disabled:opacity-50"
      >
        {checking ? "Checking…" : "CHECK AVAILABILITY"}
      </button>
      {result ? (
        <p
          className={`sm:col-span-2 text-sm font-medium ${result.serviceable ? "text-[#138808]" : "text-amber-700"}`}
          role="status"
        >
          {result.message}
        </p>
      ) : null}
    </form>
  );
}

export default function NoidaExtensionSection({ noida }) {
  return (
    <>
      <NoidaExtensionLaunchBanner noida={noida} />
      <PincodeServiceabilityCheck />
    </>
  );
}

export { NoidaExtensionLaunchBanner, PincodeServiceabilityCheck };
