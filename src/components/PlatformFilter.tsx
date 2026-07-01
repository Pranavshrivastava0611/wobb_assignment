import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { Search, Camera, PlaySquare, Music } from "lucide-react";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

function getPlatformIcon(platform: Platform) {
  switch (platform) {
    case "instagram": return <Camera size={18} />;
    case "youtube": return <PlaySquare size={18} />;
    case "tiktok": return <Music size={18} />;
    default: return null;
  }
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-8 flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/5 rounded-3xl md:rounded-full border border-white/10 backdrop-blur-sm">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
              selected === p 
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg scale-105" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {getPlatformIcon(p)}
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>
      
      <div className="relative w-full max-w-lg group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-400 transition-colors">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search creators by handle or name..."
          className="w-full pl-12 pr-4 py-3 bg-[#12121a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all shadow-inner"
        />
      </div>
    </div>
  );
}
