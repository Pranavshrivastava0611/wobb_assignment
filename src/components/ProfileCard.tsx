import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useListStore } from "@/store/useListStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

export function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addProfile, removeProfile, isInList } = useListStore();
  const inList = isInList(profile.user_id);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleListToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inList) {
      removeProfile(profile.user_id);
    } else {
      addProfile({ ...profile, platform });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="glass glass-hover flex items-center gap-4 p-4 rounded-2xl w-full max-w-2xl cursor-pointer transition-all duration-300"
    >
      <img src={profile.picture} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border border-white/10" />
      <div className="text-left flex-1 min-w-0">
        <div className="font-bold text-white flex items-center gap-1 truncate text-lg">
          <span className="truncate">@{profile.username}</span>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-400 truncate">{profile.fullname}</div>
        <div className="text-sm text-purple-300 font-medium mt-1">{formatFollowers(profile.followers)} followers</div>
      </div>
      <button
        className={`px-3 py-1 text-sm rounded transition-colors ${
          inList
            ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
        onClick={handleListToggle}
      >
        {inList ? "Added ✓" : "Add to List"}
      </button>
    </div>
  );
}
