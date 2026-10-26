import { Link } from "react-router-dom";
import { PHONE_DISPLAY, STORE_ADDRESS } from "../constants";

export function LegalSection({ heading, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-black text-cleenzo-deep mb-3">{heading}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

export default function LegalPage({ title, updated, children }) {
  return (
    <article className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-cleenzo mb-2">
        Shineworks Solutions Private Limited
      </p>
      <h1 className="text-3xl md:text-4xl font-black text-cleenzo-deep leading-tight">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated {updated}</p>
      <p className="mt-4 text-sm text-slate-600">
        Store: {STORE_ADDRESS}. Phone {PHONE_DISPLAY}. Email cs.shineworks@gmail.com.
      </p>
      <div className="mt-10">{children}</div>
      <p className="mt-10 text-sm text-slate-500">
        See also{" "}
        <Link to="/privacy/" className="font-semibold text-cleenzo hover:underline">
          Privacy Policy
        </Link>
        {" · "}
        <Link to="/terms/" className="font-semibold text-cleenzo hover:underline">
          Terms of Service
        </Link>
        {" · "}
        <Link to="/offers-terms/" className="font-semibold text-cleenzo hover:underline">
          Offer terms
        </Link>
        .
      </p>
    </article>
  );
}
