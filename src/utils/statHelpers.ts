import type { Platform, FullUserProfile } from "@/types";
import { formatFollowers } from "./formatters";

/** Represents a single stat entry for display. */
export interface StatItem {
  label: string;
  value: string;
  rawNum: number;
  suffix: string;
  highlight?: boolean;
}

/**
 * Extracts a formatted raw number + suffix for counter animations.
 * e.g., 4_400_000 → { rawNum: 4.4, suffix: "M" }
 */
function toAnimatableNum(count: number): { rawNum: number; suffix: string } {
  if (count >= 1_000_000) {
    return { rawNum: parseFloat((count / 1_000_000).toFixed(1)), suffix: "M" };
  }
  if (count >= 1_000) {
    return { rawNum: parseFloat((count / 1_000).toFixed(1)), suffix: "K" };
  }
  return { rawNum: count, suffix: "" };
}

/**
 * Build the stat items array from a full user profile.
 * Centralises the stat construction logic so both the grid and
 * the horizontal cinema-scroll can consume the same data.
 */
export function buildStatItems(user: FullUserProfile): StatItem[] {
  const items: StatItem[] = [];

  items.push({
    label: "Followers",
    value: formatFollowers(user.followers),
    ...toAnimatableNum(user.followers),
  });

  if (user.engagement_rate !== undefined) {
    items.push({
      label: "Engagement Rate",
      value: (user.engagement_rate * 100).toFixed(2) + "%",
      rawNum: parseFloat((user.engagement_rate * 100).toFixed(2)),
      suffix: "%",
      highlight: true,
    });
  }

  if (user.posts_count !== undefined) {
    items.push({
      label: "Posts",
      value: user.posts_count.toLocaleString(),
      rawNum: user.posts_count,
      suffix: "",
    });
  }

  if (user.avg_likes !== undefined) {
    items.push({
      label: "Avg Likes",
      value: formatFollowers(user.avg_likes),
      ...toAnimatableNum(user.avg_likes),
    });
  }

  if (user.avg_comments !== undefined) {
    items.push({
      label: "Avg Comments",
      value: user.avg_comments.toLocaleString(),
      rawNum: user.avg_comments,
      suffix: "",
    });
  }

  if (user.avg_views !== undefined && user.avg_views > 0) {
    items.push({
      label: "Avg Views",
      value: formatFollowers(user.avg_views),
      ...toAnimatableNum(user.avg_views),
    });
  }

  if (user.engagements !== undefined) {
    items.push({
      label: "Engagements",
      value: formatFollowers(user.engagements),
      ...toAnimatableNum(user.engagements),
    });
  }

  return items;
}

/** Maps a platform key to its display label. */
export const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
};
