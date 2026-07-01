import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { StatCard } from "@/components/StatCard";
import type { FullUserProfile, ProfileDetailResponse, Platform } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useListStore } from "@/store/useListStore";
import { buildStatItems } from "@/utils/statHelpers";
import { useScrollReveal, useHorizontalScroll, useParallax } from "@/hooks/useGsap";
import { gsap } from "@/utils/gsapInit";
import { Avatar } from "@/components/Avatar";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!username) return;
    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  // Animation refs
  const aboutRef = useScrollReveal<HTMLDivElement>({ y: 30, delay: 0.1 });
  const avatarParallaxRef = useParallax<HTMLDivElement>(-0.15);
  const { sectionRef: statsSectionRef, trackRef: statsTrackRef } =
    useHorizontalScroll<HTMLDivElement>();

  // Stat counter animation
  const statsGridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!loaded || !statsGridRef.current) return;

    const ctx = gsap.context(() => {
      const counters = statsGridRef.current!.querySelectorAll("[data-stat-value]");
      counters.forEach((el) => {
        const raw = el.getAttribute("data-stat-value") || "0";
        const num = parseFloat(raw);
        if (isNaN(num)) return;

        const suffix = el.getAttribute("data-stat-suffix") || "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: num,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            (el as HTMLElement).textContent =
              (num >= 100
                ? Math.round(obj.val).toLocaleString()
                : obj.val.toFixed(2)) + suffix;
          },
        });
      });
    }, statsGridRef);

    return () => {
      ctx.revert();
    };
  }, [loaded]);

  // ── Early returns for loading / error states ──

  if (!username) {
    return (
      <Layout>
        <p className="text-[#6B6B6B]">Invalid profile</p>
        <Link to="/" className="text-[#C4A265] underline">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#C4A265] border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-[#9A9A9A] font-display italic">Loading...</span>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-red-600 mb-4">Could not load profile details for {username}</p>
        <Link to="/" className="text-[#C4A265] underline hover:text-[#8B6914] transition-colors">
          Back to search
        </Link>
      </Layout>
    );
  }

  // ── Data-ready render ──

  const user: FullUserProfile = profileData.data.user_profile;

  return (
    <ProfileContent
      user={user}
      platform={platform}
      aboutRef={aboutRef}
      avatarParallaxRef={avatarParallaxRef}
      statsGridRef={statsGridRef}
      statsSectionRef={statsSectionRef}
      statsTrackRef={statsTrackRef}
    />
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Extracted content component — keeps the main component lean and allows
// hooks at the top level while still having early-return guards above.
// ────────────────────────────────────────────────────────────────────────────

interface ProfileContentProps {
  user: FullUserProfile;
  platform: string;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  avatarParallaxRef: React.RefObject<HTMLDivElement | null>;
  statsGridRef: React.RefObject<HTMLDivElement | null>;
  statsSectionRef: React.RefObject<HTMLDivElement | null>;
  statsTrackRef: React.RefObject<HTMLDivElement | null>;
}

function ProfileContent({
  user,
  platform,
  aboutRef,
  avatarParallaxRef,
  statsGridRef,
  statsSectionRef,
  statsTrackRef,
}: ProfileContentProps) {
  const inList = useListStore((state) =>
    state.profiles.some((p) => p.user_id === user.user_id)
  );
  const addProfile = useListStore((state) => state.addProfile);
  const removeProfile = useListStore((state) => state.removeProfile);

  // Memoize stat items so they don't rebuild every render
  const statItems = useMemo(() => buildStatItems(user), [user]);

  const handleListToggle = useCallback(() => {
    if (inList) {
      removeProfile(user.user_id);
    } else {
      addProfile({
        user_id: user.user_id,
        username: user.username,
        fullname: user.fullname,
        picture: user.picture,
        followers: user.followers,
        is_verified: user.is_verified,
        url: user.url || "",
        platform: platform as Platform,
      });
    }
  }, [inList, removeProfile, addProfile, user, platform]);

  return (
    <Layout>
      {/* ── Back Button ── */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors mb-8
                   bg-white px-5 py-2.5 rounded-full border border-[rgba(193,162,101,0.15)] shadow-sm
                   hover:shadow-md group w-fit no-underline"
      >
        <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
        Back to Search
      </Link>

      {/* ── Hero Profile Section ── */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start text-left w-full max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="flex flex-col items-center md:items-start bg-white p-8 md:p-10 rounded-3xl w-full md:w-[340px] lg:w-[380px] text-center md:text-left border border-[rgba(193,162,101,0.12)] shadow-sm">
          <div ref={avatarParallaxRef} className="relative mb-6">
            <div className="absolute -inset-2 rounded-full border-2 border-[#E8D5B5] opacity-60" />
            <div className="absolute -inset-4 rounded-full border border-[#F0E8D5] opacity-40" />
            <Avatar
              src={user.picture}
              alt={user.fullname}
              name={user.fullname || user.username}
              sizeClass="w-32 h-32 md:w-44 md:h-44"
              className="relative border-4 border-white shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] flex items-center justify-center md:justify-start gap-2 mb-1">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </h2>
          <p className="text-[#6B6B6B] font-display italic text-lg">{user.fullname}</p>

          <div className="mt-4 px-4 py-1.5 bg-[#F5F0E8] rounded-full text-xs font-semibold text-[#8B6914] border border-[#E8D5B5] uppercase tracking-wider">
            {platform}
          </div>

          <div className="w-full mt-8 flex flex-col gap-3">
            <button
              className={`w-full py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 text-sm ${
                inList
                  ? "bg-[#F5F0E8] text-[#8B6914] border border-[#E8D5B5] hover:bg-[#E8D5B5]"
                  : "bg-[#1A1A1A] text-white shadow-md hover:bg-[#6B4226] hover:scale-[1.02] hover:shadow-lg"
              }`}
              onClick={handleListToggle}
            >
              {inList ? "✓ In Your Collection" : "Add to Collection"}
            </button>

            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl font-semibold bg-white text-[#1A1A1A] border border-[rgba(193,162,101,0.15)] hover:bg-[#F5F0E8] hover:border-[#E8D5B5] transition-all duration-300 text-center text-sm no-underline"
              >
                View on {platform} ↗
              </a>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 w-full">
          {user.description && (
            <div ref={aboutRef} className="bg-white p-6 md:p-8 rounded-3xl mb-6 border border-[rgba(193,162,101,0.12)] shadow-sm">
              <h3 className="text-xs font-semibold text-[#C4A265] uppercase tracking-[0.15em] mb-4">About</h3>
              <p className="text-[#2D2D2D] leading-relaxed whitespace-pre-wrap">{user.description}</p>
            </div>
          )}

          <div ref={statsGridRef} className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {statItems.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} highlight={stat.highlight} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Cinematic Horizontal Scroll Stats ── */}
      {statItems.length >= 3 && (
        <div className="mt-16 md:mt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C4A265] mb-6">◆ Performance Overview</p>
          <div ref={statsSectionRef} className="horizontal-scroll-section">
            <div ref={statsTrackRef} className="horizontal-scroll-track py-4">
              {statItems.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`shrink-0 w-[280px] md:w-[320px] p-8 rounded-3xl border transition-all duration-300 ${
                    stat.highlight
                      ? "bg-gradient-to-br from-[#F5F0E8] to-[#EDE6D8] border-[#C4A265]/30 shadow-lg"
                      : "bg-white border-[rgba(193,162,101,0.12)] shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className={`text-xs font-semibold uppercase tracking-[0.15em] mb-3 ${stat.highlight ? "text-[#8B6914]" : "text-[#9A9A9A]"}`}>
                    {stat.label}
                  </div>
                  <div
                    className={`text-4xl md:text-5xl font-bold font-display ${stat.highlight ? "text-[#6B4226]" : "text-[#1A1A1A]"}`}
                    data-stat-value={stat.rawNum}
                    data-stat-suffix={stat.suffix}
                    data-stat-index={i}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
