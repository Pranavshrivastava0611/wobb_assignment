import React from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { useStaggerReveal } from "@/hooks/useGsap";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
}

export const ProfileList = React.memo(function ProfileList({
  profiles,
  platform,
}: ProfileListProps) {
  const gridRef = useStaggerReveal<HTMLDivElement>("[data-profile-card]", {
    stagger: 0.06,
    y: 25,
  });

  return (
    <div className="w-full">
      {profiles.length === 0 && (
        <div className="text-center py-16">
          <p className="font-display italic text-xl text-[#9A9A9A]">
            No creators found matching your search
          </p>
          <p className="text-sm text-[#C4A265] mt-2">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 place-items-center md:place-items-stretch"
      >
        {profiles.map((profile) => (
          <div
            key={profile.user_id}
            data-profile-card
            className="w-full flex justify-center"
          >
            <ProfileCard
              profile={profile}
              platform={platform}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
