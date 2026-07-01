import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useDebounce } from "@/hooks/useDebounce";
import { useScrollReveal } from "@/hooks/useGsap";
import { gsap } from "@/utils/gsapInit";
import { formatFollowers } from "@/utils/formatters";

/** Small marquee card for the featured creators strip. */
function MarqueeCard({ profile }: { profile: UserProfileSummary }) {
  return (
    <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 border border-[rgba(193,162,101,0.12)] shadow-sm shrink-0 hover:shadow-md transition-shadow duration-300">
      <img
        src={profile.picture}
        alt={profile.fullname}
        loading="lazy"
        className="w-10 h-10 rounded-full object-cover border border-[#E8D5B5]"
      />
      <div className="text-left">
        <div className="text-sm font-semibold text-[#1A1A1A]">
          @{profile.username}
        </div>
        <div className="text-xs text-[#C4A265]">
          {formatFollowers(profile.followers)} followers
        </div>
      </div>
    </div>
  );
}

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, debouncedSearchQuery),
    [allProfiles, debouncedSearchQuery]
  );

  const heroRef = useScrollReveal<HTMLDivElement>({ y: 30 });
  const subtitleRef = useScrollReveal<HTMLParagraphElement>({ delay: 0.15, y: 20 });
  const filterRef = useScrollReveal<HTMLDivElement>({ delay: 0.25, y: 20 });

  // Marquee animation
  const marqueeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!marqueeRef.current) return;
    const track = marqueeRef.current;
    const totalWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [platform]);

  // Top 6 profiles for marquee, duplicated for seamless loop
  const featuredProfiles = useMemo(() => allProfiles.slice(0, 6), [allProfiles]);
  const marqueeProfiles = useMemo(
    () => [...featuredProfiles, ...featuredProfiles],
    [featuredProfiles]
  );

  // Stable callbacks to avoid child re-renders
  const handlePlatformChange = useCallback(
    (p: Platform) => {
      setPlatform(p);
      setSearchQuery("");
    },
    []
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  return (
    <Layout>
      {/* ── Hero Section ── */}
      <div className="text-center md:text-left mb-12 md:mb-16 pt-4">
        <div ref={heroRef}>
          <h1 className="font-display italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1A1A1A] tracking-tight leading-[1.1]">
            Discover<br />
            <span className="text-[#C4A265]">Extraordinary</span>{" "}
            Creators
          </h1>
        </div>
        <p
          ref={subtitleRef}
          className="text-[#6B6B6B] mt-4 md:mt-6 text-base md:text-lg font-light max-w-lg mx-auto md:mx-0"
        >
          Browse top influencers across social platforms. Curate your
          perfect list of collaborators.
        </p>
      </div>

      {/* ── Featured Marquee ── */}
      <div className="mb-12 md:mb-16 overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 py-6 bg-[#F5F0E8]/60">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C4A265] mb-4 px-4 sm:px-6 lg:px-8">
          ◆ Featured Creators
        </p>
        <div ref={marqueeRef} className="flex gap-6 whitespace-nowrap">
          {marqueeProfiles.map((p, i) => (
            <MarqueeCard key={`${p.user_id}-${i}`} profile={p} />
          ))}
        </div>
      </div>

      {/* ── Filters & Search ── */}
      <div ref={filterRef}>
        <PlatformFilter
          selected={platform}
          onChange={handlePlatformChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </div>

      {/* ── Results Count ── */}
      <p className="text-xs text-[#9A9A9A] mb-6 tracking-wide uppercase">
        Showing{" "}
        <span className="text-[#1A1A1A] font-semibold">{filtered.length}</span>{" "}
        of {allProfiles.length} on{" "}
        <span className="text-[#C4A265] font-medium">{platform}</span>
      </p>

      {/* ── Profile Grid ── */}
      <ProfileList profiles={filtered} platform={platform} />
    </Layout>
  );
}
