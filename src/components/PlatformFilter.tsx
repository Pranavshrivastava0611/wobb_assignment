import React, { useRef, useEffect } from "react";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { Search, Camera, PlaySquare, Music } from "lucide-react";
import { gsap } from "@/utils/gsapInit";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

function getPlatformIcon(platform: Platform) {
  switch (platform) {
    case "instagram":
      return <Camera size={18} />;
    case "youtube":
      return <PlaySquare size={18} />;
    case "tiktok":
      return <Music size={18} />;
    default:
      return null;
  }
}

export const PlatformFilter = React.memo(function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  // Animate the sliding indicator
  useEffect(() => {
    if (!tabsRef.current || !indicatorRef.current) return;

    const activeBtn = tabsRef.current.querySelector(
      `[data-platform="${selected}"]`
    ) as HTMLElement | null;

    if (!activeBtn) return;

    if (!mountedRef.current) {
      // Instant position on first render
      gsap.set(indicatorRef.current, {
        x: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
      mountedRef.current = true;
    } else {
      gsap.to(indicatorRef.current, {
        x: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [selected]);

  return (
    <div className="mb-8 flex flex-col items-center gap-6">
      {/* Tab Pills */}
      <div
        ref={tabsRef}
        className="relative flex flex-wrap justify-center gap-1 p-1.5 bg-white rounded-2xl md:rounded-full border border-[rgba(193,162,101,0.12)] shadow-sm"
      >
        {/* Sliding Indicator */}
        <div
          ref={indicatorRef}
          className="absolute top-1.5 left-0 h-[calc(100%-12px)] bg-[#1A1A1A] rounded-xl md:rounded-full z-0 pointer-events-none"
        />

        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            data-platform={p}
            onClick={() => onChange(p)}
            className={`relative z-10 flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-medium transition-colors duration-300 ${
              selected === p
                ? "text-white"
                : "text-[#6B4226] hover:text-[#1A1A1A]"
            }`}
          >
            {getPlatformIcon(p)}
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-lg group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9A9A9A] group-focus-within:text-[#C4A265] transition-colors duration-300">
          <Search size={20} />
        </div>
        <input
          id="search-influencers"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search creators by handle or name..."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-[rgba(193,162,101,0.15)] rounded-xl text-[#1A1A1A] placeholder-[#9A9A9A]
                     focus:outline-none focus:ring-2 focus:ring-[#C4A265]/40 focus:border-[#C4A265]
                     transition-all duration-300 shadow-sm text-sm"
        />
      </div>
    </div>
  );
});
