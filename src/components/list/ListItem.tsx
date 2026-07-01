import React from "react";
import { Trash2 } from "lucide-react";
import type { ListProfile } from "@/store/useListStore";
import { formatFollowers } from "@/utils/formatters";

interface ListItemProps {
  profile: ListProfile;
  onRemove: (userId: string) => void;
}

export const ListItem = React.memo(function ListItem({ profile, onRemove }: ListItemProps) {
  return (
    <div className="flex items-center gap-3 p-3.5 bg-white rounded-xl mb-2 border border-[rgba(193,162,101,0.1)] hover:border-[rgba(193,162,101,0.25)] hover:shadow-sm transition-all duration-300">
      <img
        src={profile.picture}
        alt={profile.username}
        loading="lazy"
        className="w-10 h-10 rounded-full object-cover border border-[#E8D5B5]"
      />
      <div className="flex-1 min-w-0 text-left">
        <div className="font-semibold text-sm truncate text-[#1A1A1A]">
          @{profile.username}
        </div>
        <div className="text-xs text-[#C4A265]">
          {formatFollowers(profile.followers)} followers
        </div>
      </div>
      <button
        onClick={() => onRemove(profile.user_id)}
        className="text-[#9A9A9A] hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
        title="Remove"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
});
