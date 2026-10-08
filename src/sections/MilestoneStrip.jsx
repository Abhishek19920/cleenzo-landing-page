import { useEffect, useRef, useState } from "react";
import { fetchStoreMilestone } from "../api/milestone";
import {
  scaledCount,
  useCountUpProgress,
} from "../hooks/useCountUpProgress";
import "./milestone-strip.css";

const STATS = [
  { key: "clothesWashed", icon: "👕", label: "Clothes Washed" },
  { key: "dryCleanedItems", icon: "✨", label: "Dry Cleaned Items" },
  { key: "shoesCleaned", icon: "👟", label: "Shoes Cleaned" },
  { key: "customerSavingsInr", icon: "🎁", label: "Customer Savings", money: true },
  { key: "ordersCompleted", icon: "📦", label: "Orders Completed" },
  { key: "customersServed", icon: "❤️", label: "Customers Served" },
];

function formatCount(n) {
  return `${Math.max(0, n).toLocaleString("en-IN")}+`;
}

function formatSavings(n) {
  const amount = Math.max(0, Math.round(n));
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    const compact = lakhs >= 10 ? lakhs.toFixed(1) : lakhs.toFixed(2);
    return `₹${compact.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1")}L+`;
  }
  return `₹${amount.toLocaleString("en-IN")}+`;
}

function MilestoneStrip() {
  const sectionRef = useRef(null);
  const [data, setData] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetchStoreMilestone()
      .then((payload) => {
        if (!cancelled && payload) setData(payload);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const ready = Boolean(data) && inView;
  const progress = useCountUpProgress(ready, 2100);

  return (
    <section
      ref={sectionRef}
      className="milestone-strip"
      aria-labelledby="milestone-strip-title"
    >
      <div className="milestone-strip-inner">
        <div className="milestone-strip-copy">
          <div>
            <p className="milestone-strip-kicker">
              🎉 {data?.kicker ?? "Cleenzo Raj Nagar Extension"}
            </p>
            <p id="milestone-strip-title" className="milestone-strip-title">
              {data?.periodLabel ?? "Our First 2 Months"}
            </p>
            <p className="milestone-strip-headline">
              {data?.headline ?? "Look What We’ve Achieved Together!"}
            </p>
            <p className="milestone-strip-sub">
              {data?.subline ??
                "2 months of cleaning, caring & serving our community."}
            </p>
          </div>
          <p className="milestone-strip-tagline">
            {data?.tagline ?? "2 Months of Cleenzo. And We’re Just Getting Started."}
          </p>
        </div>

        <div className="milestone-strip-stats" role="list">
          {STATS.map((stat) => {
            const target = Number(data?.[stat.key] ?? 0);
            const current = data ? scaledCount(target, progress) : 0;
            const display = stat.money
              ? formatSavings(current)
              : formatCount(current);
            const fullSavings = `₹${Math.round(target).toLocaleString("en-IN")}+`;
            return (
              <div key={stat.key} className="milestone-strip-stat" role="listitem">
                <span className="milestone-strip-icon" aria-hidden="true">
                  {stat.icon}
                </span>
                <span
                  className="milestone-strip-value"
                  aria-label={
                    stat.money
                      ? `${stat.label} ${fullSavings}`
                      : `${stat.label} ${formatCount(target)}`
                  }
                >
                  {data ? display : "—"}
                </span>
                <span className="milestone-strip-label">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MilestoneStrip;
