import React from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
}

export const ProfileList = React.memo(function ProfileList({
  profiles,
  platform,
}: ProfileListProps) {
  return (
    <div className="w-full">
      {profiles.length === 0 && <p className="text-gray-500 text-center py-8">No profiles found matching your search</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center md:place-items-stretch">
        {profiles.map((profile) => (
          <div key={profile.user_id} className="w-full flex justify-center">
            <ProfileCard
              profile={profile}
              platform={platform}
              searchQuery=""
            />
          </div>
        ))}
      </div>
    </div>
  );
});
