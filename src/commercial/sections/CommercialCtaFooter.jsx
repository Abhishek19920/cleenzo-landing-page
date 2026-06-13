import { COMMERCIAL_CONTACT } from "../data";

function CommercialCtaFooter({ onMeetingClick }) {
  return (
    <footer className="bg-[#0A3D91] text-white py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-2xl md:text-4xl font-black mb-4 leading-tight">
          Focus On Your Business. We&apos;ll Take Care Of The Laundry.
        </h2>
        <p className="text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
          Whether you need daily, alternate-day, or scheduled laundry services, Cleenzo provides
          customized commercial laundry solutions designed around your business needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a
            href={`tel:${COMMERCIAL_CONTACT.phoneTel}`}
            className="bg-white text-[#0A3D91] font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition"
          >
            Call Now
          </a>
          <button
            type="button"
            onClick={onMeetingClick}
            className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition"
          >
            Schedule Meeting
          </button>
        </div>

        <div className="space-y-2 text-sm md:text-base">
          <p className="font-bold">Phone: {COMMERCIAL_CONTACT.phone}</p>
          <p>
            Website:{" "}
            <a href={COMMERCIAL_CONTACT.website} className="font-bold underline hover:text-cyan-200">
              {COMMERCIAL_CONTACT.websiteDisplay}
            </a>
          </p>
          <p className="max-w-xl mx-auto opacity-95">{COMMERCIAL_CONTACT.address}</p>
        </div>
      </div>
    </footer>
  );
}

export default CommercialCtaFooter;
