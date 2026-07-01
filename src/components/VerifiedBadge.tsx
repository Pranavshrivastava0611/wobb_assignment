import { BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <BadgeCheck 
      size={18} 
      className="inline-block ml-1 text-blue-500 bg-white rounded-full fill-blue-500" 
      stroke="white" 
    />
  );
}
