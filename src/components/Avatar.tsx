import React, { useState, useEffect } from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  className?: string;
  sizeClass?: string;
}

function getInitials(name: string): string {
  if (!name) return "?";
  // Remove leading @ if present
  const cleanName = name.trim().replace(/^@/, "");
  if (!cleanName) return "?";
  
  const parts = cleanName.split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const Avatar = React.memo(function Avatar({
  src,
  alt = "",
  name = "",
  className = "",
  sizeClass = "w-12 h-12",
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  const initials = getInitials(name || alt);

  if (!src || hasError) {
    return (
      <div
        className={`rounded-full bg-[#F5F0E8] border border-[#E8D5B5] flex items-center justify-center font-display italic text-[#8B6914] font-semibold text-center select-none ${sizeClass} ${className}`}
        title={name || alt}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className={`rounded-full object-cover ${sizeClass} ${className}`}
    />
  );
});
