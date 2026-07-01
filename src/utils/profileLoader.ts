import type { ProfileDetailResponse } from "@/types";
import { PLATFORMS, extractProfiles } from "./dataHelpers";

const profileModules = import.meta.glob<{ default: ProfileDetailResponse }>(
  "../assets/data/profiles/*.json"
);

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  const searchPath = `../assets/data/profiles/${username.toLowerCase()}.json`;
  
  const matchedPath = Object.keys(profileModules).find(
    (key) => key.toLowerCase() === searchPath
  );

  const loader = matchedPath ? profileModules[matchedPath] : undefined;

  if (loader) {
    try {
      const result = await loader();
      const data = result?.default ?? result;
      return data as ProfileDetailResponse;
    } catch (error) {
      console.error(`Failed to load profile data for ${username}:`, error);
    }
  } else {
    console.warn(`Detailed profile JSON not found for: ${username}. Falling back to basic search data.`);
  }

  // Fallback: search in our search JSON data for basic details
  for (const platform of PLATFORMS) {
    const profiles = extractProfiles(platform);
    const basicProfile = profiles.find(
      (p) =>
        p.username?.toLowerCase() === username.toLowerCase() ||
        p.handle?.toLowerCase() === username.toLowerCase()
    );

    if (basicProfile) {
      return {
        cached: false,
        data: {
          success: true,
          user_profile: {
            ...basicProfile,
          },
        },
      } as ProfileDetailResponse;
    }
  }

  return null;
}
