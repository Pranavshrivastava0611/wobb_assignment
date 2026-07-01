import { describe, it, expect, beforeEach } from "vitest";
import { useListStore } from "../store/useListStore";

const mockProfile = {
  user_id: "test-user-123",
  username: "mrbeast",
  fullname: "Jimmy Donaldson",
  picture: "pic.jpg",
  followers: 178000000,
  is_verified: true,
  platform: "youtube" as const
};

describe("useListStore", () => {
  beforeEach(() => {
    // Clear list before each test to ensure test isolation
    useListStore.getState().clearList();
  });

  it("starts with an empty collection list", () => {
    const state = useListStore.getState();
    expect(state.profiles).toEqual([]);
  });

  it("adds a profile and registers inList", () => {
    useListStore.getState().addProfile(mockProfile);

    const state = useListStore.getState();
    expect(state.profiles).toHaveLength(1);
    expect(state.profiles[0]).toEqual(mockProfile);
    expect(state.isInList(mockProfile.user_id)).toBe(true);
  });

  it("does not add duplicate profiles", () => {
    useListStore.getState().addProfile(mockProfile);
    useListStore.getState().addProfile(mockProfile);

    const state = useListStore.getState();
    expect(state.profiles).toHaveLength(1);
  });

  it("removes a profile by user_id", () => {
    useListStore.getState().addProfile(mockProfile);
    useListStore.getState().removeProfile(mockProfile.user_id);

    const state = useListStore.getState();
    expect(state.profiles).toHaveLength(0);
    expect(state.isInList(mockProfile.user_id)).toBe(false);
  });

  it("clears the list fully", () => {
    useListStore.getState().addProfile(mockProfile);
    useListStore.getState().clearList();

    const state = useListStore.getState();
    expect(state.profiles).toHaveLength(0);
  });
});
