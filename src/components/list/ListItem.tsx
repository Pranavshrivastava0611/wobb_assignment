import { Trash2 } from "lucide-react";
import type { ListProfile } from "@/store/useListStore";
import { formatFollowers } from "@/utils/formatters";

interface ListItemProps {
  profile: ListProfile;
  onRemove: (userId: string) => void;
}

export function ListItem({ profile, onRemove }: ListItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 glass rounded-lg mb-2 hover:bg-white/5 transition-colors">
      <img src={profile.picture} alt={profile.username} className="w-10 h-10 rounded-full" />
      <div className="flex-1 min-w-0 text-left">
        <div className="font-semibold text-sm truncate text-white">@{profile.username}</div>
        <div className="text-xs text-gray-400">{formatFollowers(profile.followers)} followers</div>
      </div>
      <button
        onClick={() => onRemove(profile.user_id)}
        className="text-gray-500 hover:text-red-400 p-2 rounded-md hover:bg-red-400/10 transition-colors"
        title="Remove"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
