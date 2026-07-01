import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse, Platform } from "@/types";
import { formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useListStore } from "@/store/useListStore";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);
  
  const { addProfile, removeProfile, isInList } = useListStore();

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-gray-400">Loading...</p>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-red-600 mb-4">
          Could not load profile details for {username}
        </p>
        <Link to="/" className="text-blue-600 underline">
          Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const inList = isInList(user.user_id);

  const handleListToggle = () => {
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
  };

  return (
    <Layout title={user.fullname}>
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors mb-8 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20 w-fit">
        ← Back to Search
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-start text-left w-full max-w-5xl mx-auto">
        {/* Left Column: Avatar & Basic Info */}
        <div className="flex flex-col items-center md:items-start glass p-8 rounded-3xl w-full md:w-1/3 text-center md:text-left">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-md opacity-50"></div>
            <img
              src={user.picture}
              alt={user.fullname}
              className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-[#12121a] object-cover shadow-2xl"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2 mb-1">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </h2>
          <p className="text-gray-400 font-medium text-lg">{user.fullname}</p>
          <div className="mt-4 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-gray-300 border border-white/5 uppercase tracking-wider">
            {platform}
          </div>

          <div className="w-full mt-8 flex flex-col gap-3">
            <button
              className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                inList
                  ? "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02]"
              }`}
              onClick={handleListToggle}
            >
              {inList ? "Remove from List" : "Add to List"}
            </button>
            
            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-semibold bg-white/5 text-gray-300 border border-white/5 hover:bg-white/10 hover:text-white transition-colors text-center"
              >
                View on {platform} ↗
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Stats & Description */}
        <div className="flex-1 w-full">
          {user.description && (
            <div className="glass p-6 md:p-8 rounded-3xl mb-6">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">About</h3>
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{user.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Followers" value={formatFollowers(user.followers)} />
            
            <StatCard 
              label="Engagement Rate" 
              value={user.engagement_rate !== undefined ? (user.engagement_rate * 100).toFixed(2) + "%" : "N/A"} 
              highlight
            />
            
            {user.posts_count !== undefined && (
              <StatCard label="Posts" value={user.posts_count.toLocaleString()} />
            )}
            
            {user.avg_likes !== undefined && (
              <StatCard label="Avg Likes" value={formatFollowers(user.avg_likes)} />
            )}
            
            {user.avg_comments !== undefined && (
              <StatCard label="Avg Comments" value={user.avg_comments.toLocaleString()} />
            )}
            
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <StatCard label="Avg Views" value={formatFollowers(user.avg_views)} />
            )}
            
            {user.engagements !== undefined && (
              <StatCard label="Engagements" value={formatFollowers(user.engagements)} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ label, value, highlight = false }: { label: string, value: string | number, highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-3xl border transition-all duration-300 ${
      highlight 
        ? "bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30 shadow-[0_0_30px_-10px_rgba(168,85,247,0.2)]" 
        : "glass glass-hover"
    }`}>
      <div className={`text-sm font-medium mb-2 ${highlight ? "text-purple-300" : "text-gray-400"}`}>
        {label}
      </div>
      <div className={`text-2xl md:text-3xl font-bold ${highlight ? "text-white" : "text-gray-100"}`}>
        {value}
      </div>
    </div>
  );
}
