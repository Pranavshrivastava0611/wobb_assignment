import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useListStore } from "@/store/useListStore";
import { Avatar } from "./Avatar";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}

export const ProfileCard = React.memo(function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const inList = useListStore((state) =>
    state.profiles.some((p) => p.user_id === profile.user_id)
  );
  const addProfile = useListStore((state) => state.addProfile);
  const removeProfile = useListStore((state) => state.removeProfile);

  const handleClick = useCallback(() => {
    onProfileClick?.(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  }, [navigate, onProfileClick, profile.username, platform]);

  const handleListToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (inList) {
        removeProfile(profile.user_id);
      } else {
        addProfile({ ...profile, platform });
      }
    },
    [inList, removeProfile, addProfile, profile, platform]
  );

  return (
    <div
      onClick={handleClick}
      className="card-premium flex items-center gap-4 p-4 md:p-5 w-full max-w-2xl cursor-pointer group"
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <Avatar
          src={profile.picture}
          alt={profile.fullname}
          name={profile.fullname || profile.username}
          sizeClass="w-14 h-14 md:w-16 md:h-16"
          className="border-2 border-[#E8D5B5] group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info */}
      <div className="text-left flex-1 min-w-0">
        <div className="font-semibold text-[#1A1A1A] flex items-center gap-1 truncate text-base md:text-lg">
          <span className="truncate">@{profile.username}</span>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-[#6B6B6B] truncate font-display italic">
          {profile.fullname}
        </div>
        <div className="text-sm text-[#C4A265] font-medium mt-0.5">
          {formatFollowers(profile.followers)} followers
        </div>
      </div>

      {/* Add to List Button */}
      <button
        className={`shrink-0 px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 ${
          inList
            ? "bg-[#F5F0E8] text-[#8B6914] border border-[#E8D5B5] hover:bg-[#E8D5B5]"
            : "bg-[#1A1A1A] text-white hover:bg-[#6B4226] hover:scale-[1.03] shadow-sm"
        }`}
        onClick={handleListToggle}
      >
        {inList ? "Added ✓" : "Add to List"}
      </button>
    </div>
  );
});
