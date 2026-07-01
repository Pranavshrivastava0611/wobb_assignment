import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

/** Reusable stat card used on the profile detail page. */
export const StatCard = React.memo(function StatCard({
  label,
  value,
  highlight = false,
}: StatCardProps) {
  return (
    <div
      className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 hover-lift ${
        highlight
          ? "bg-gradient-to-br from-[#F5F0E8] to-[#EDE6D8] border-[#C4A265]/30 shadow-md"
          : "bg-white border-[rgba(193,162,101,0.12)] shadow-sm hover:shadow-md"
      }`}
    >
      <div
        className={`text-xs font-semibold uppercase tracking-[0.15em] mb-2 ${
          highlight ? "text-[#8B6914]" : "text-[#9A9A9A]"
        }`}
      >
        {label}
      </div>
      <div
        className={`text-2xl md:text-3xl font-bold ${
          highlight ? "text-[#6B4226]" : "text-[#1A1A1A]"
        }`}
      >
        {value}
      </div>
    </div>
  );
});
