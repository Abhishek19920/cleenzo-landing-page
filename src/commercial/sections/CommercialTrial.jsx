import { TRIAL_OPTIONS } from "../data";

function CommercialTrial({ onTrialClick }) {
  return (
    <section id="commercial-trial" className="scroll-mt-36 bg-gradient-to-br from-[#0A3D91] to-[#1456a8] text-white py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-8">
          Experience Cleenzo Quality Before You Commit
        </h2>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mb-10">
          {TRIAL_OPTIONS.map((option, index) => (
            <div key={option} className="flex items-center gap-3">
              {index > 0 && <span className="font-bold opacity-80 hidden sm:inline">OR</span>}
              <p className="text-lg md:text-xl font-black">{option}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onTrialClick}
          className="bg-white text-[#0A3D91] font-bold px-10 py-4 rounded-xl hover:bg-slate-100 transition"
        >
          Request Trial Pickup
        </button>
      </div>
    </section>
  );
}

export default CommercialTrial;
