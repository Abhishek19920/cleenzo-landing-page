import { ALPHABET } from "../../utils/pricingSearch";

function AlphabetFilter({ activeLetter, letterCounts, onSelectLetter, totalCount }) {
  if (!letterCounts?.size) return null;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Jump by letter
        </p>
        {activeLetter ? (
          <button
            type="button"
            onClick={() => onSelectLetter(null)}
            className="text-xs font-bold text-cleenzo hover:underline"
          >
            Show all ({totalCount})
          </button>
        ) : null}
      </div>
      <div
        className="flex flex-wrap gap-1.5"
        role="group"
        aria-label="Filter price list by first letter"
      >
        <button
          type="button"
          onClick={() => onSelectLetter(null)}
          aria-pressed={!activeLetter}
          className={`min-w-[2.25rem] h-9 px-2 rounded-lg text-xs font-bold border transition ${
            !activeLetter
              ? "bg-cleenzo border-cleenzo text-white"
              : "bg-white border-cleenzo-sky-light text-slate-600 hover:border-cleenzo/30"
          }`}
        >
          All
        </button>
        {ALPHABET.map((letter) => {
          const count = letterCounts.get(letter) ?? 0;
          const disabled = count === 0;
          const isActive = activeLetter === letter;
          return (
            <button
              key={letter}
              type="button"
              disabled={disabled}
              onClick={() => onSelectLetter(isActive ? null : letter)}
              aria-pressed={isActive}
              aria-label={`${letter}, ${count} items`}
              title={disabled ? `No items starting with ${letter}` : `${count} items`}
              className={`min-w-[2.25rem] h-9 rounded-lg text-xs font-bold border transition ${
                disabled
                  ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                  : isActive
                    ? "bg-cleenzo border-cleenzo text-white shadow-sm"
                    : "bg-white border-cleenzo-sky-light text-slate-700 hover:border-cleenzo/30 hover:bg-cleenzo-pale/40"
              }`}
            >
              {letter}
            </button>
          );
        })}
        {(letterCounts.get("#") ?? 0) > 0 ? (
          <button
            type="button"
            onClick={() => onSelectLetter(activeLetter === "#" ? null : "#")}
            aria-pressed={activeLetter === "#"}
            className={`min-w-[2.25rem] h-9 px-2 rounded-lg text-xs font-bold border transition ${
              activeLetter === "#"
                ? "bg-cleenzo border-cleenzo text-white"
                : "bg-white border-cleenzo-sky-light text-slate-700 hover:border-cleenzo/30"
            }`}
          >
            #
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default AlphabetFilter;
