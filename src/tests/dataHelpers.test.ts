import { describe, it, expect } from "vitest";
import { filterProfiles, getPlatformLabel, extractProfiles } from "../utils/dataHelpers";
import type { UserProfileSummary } from "@/types";

const mockProfiles: UserProfileSummary[] = [
  {
    user_id: "1",
    username: "mrbeast",
    fullname: "Jimmy Donaldson",
    picture: "pic1.jpg",
    followers: 178000000,
    is_verified: true,
    platform: "youtube"
  },
  {
    user_id: "2",
    username: "instagram",
    fullname: "Instagram",
    picture: "pic2.jpg",
    followers: 678000000,
    is_verified: true,
    platform: "instagram"
  },
  {
    user_id: "3",
    username: "cristiano",
    fullname: "Cristiano Ronaldo",
    picture: "pic3.jpg",
    followers: 641000000,
    is_verified: true,
    platform: "instagram"
  }
];

describe("filterProfiles", () => {
  it("returns all profiles if query is empty", () => {
    expect(filterProfiles(mockProfiles, "")).toEqual(mockProfiles);
  });

  it("filters profiles case-insensitively by username", () => {
    const results = filterProfiles(mockProfiles, "BEAST");
    expect(results).toHaveLength(1);
    expect(results[0].username).toBe("mrbeast");
  });

  it("filters profiles case-insensitively by fullname", () => {
    const results = filterProfiles(mockProfiles, "ronaldo");
    expect(results).toHaveLength(1);
    expect(results[0].fullname).toBe("Cristiano Ronaldo");
  });

  it("returns empty array if no match is found", () => {
    const results = filterProfiles(mockProfiles, "nonexistent");
    expect(results).toHaveLength(0);
  });
});

describe("getPlatformLabel", () => {
  it("returns formatted platform labels", () => {
    expect(getPlatformLabel("instagram")).toBe("Instagram");
    expect(getPlatformLabel("youtube")).toBe("YouTube");
    expect(getPlatformLabel("tiktok")).toBe("TikTok");
  });
});

describe("extractProfiles", () => {
  it("extracts account profiles from search JSON files successfully", () => {
    const instagramProfiles = extractProfiles("instagram");
    expect(instagramProfiles.length).toBeGreaterThan(0);
    expect(instagramProfiles[0]).toHaveProperty("username");
    expect(instagramProfiles[0]).toHaveProperty("followers");
  });
});
