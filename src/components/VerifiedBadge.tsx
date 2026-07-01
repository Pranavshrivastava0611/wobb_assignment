import React from "react";
import { BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
  verified: boolean;
}

export const VerifiedBadge = React.memo(function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <BadgeCheck
      size={18}
      className="inline-block ml-1 text-[#C4A265] rounded-full"
      stroke="#C4A265"
      fill="rgba(196, 162, 101, 0.15)"
    />
  );
});
