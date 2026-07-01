import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Users } from "lucide-react";
import { useListStore } from "@/store/useListStore";
import { ListItem } from "./ListItem";
import { gsap } from "@/utils/gsapInit";

export function ListDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const profiles = useListStore((state) => state.profiles);
  const removeProfile = useListStore((state) => state.removeProfile);
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const closeDrawer = useCallback(() => {
    const overlay = overlayRef.current;
    const drawer = drawerRef.current;
    if (!overlay || !drawer) { setIsOpen(false); return; }
    const tl = gsap.timeline({ onComplete: () => setIsOpen(false) });
    tl.to(drawer, { x: "100%", duration: 0.4, ease: "power3.in" })
      .to(overlay, { opacity: 0, duration: 0.3, ease: "power2.in" }, "<0.05");
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => {
      const overlay = overlayRef.current;
      const drawer = drawerRef.current;
      if (!overlay || !drawer) return;
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(drawer, { x: "100%" }, { x: "0%", duration: 0.5, ease: "power3.out" });
      const items = drawer.querySelectorAll("[data-list-item]");
      if (items.length > 0) {
        gsap.fromTo(items, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", delay: 0.2 });
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-[#1A1A1A] hover:bg-[#6B4226] text-white rounded-full p-2 md:px-5 md:py-2.5 md:rounded-xl shadow-md flex items-center gap-2 transition-all duration-300 hover:scale-105 relative">
        <Users size={18} />
        <span className="hidden md:inline font-semibold text-sm">My Collection</span>
        {profiles.length > 0 && (
          <span className="absolute -top-2 -right-2 md:static bg-[#C4A265] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">{profiles.length}</span>
        )}
      </button>

      {isOpen && createPortal(
        <div className="relative z-50">
          <div ref={overlayRef} onClick={closeDrawer} className="fixed inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm" />
          <div ref={drawerRef} className="fixed top-0 right-0 h-[100dvh] w-full max-w-sm bg-[#FAFAF8] border-l border-[rgba(193,162,101,0.15)] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[rgba(193,162,101,0.12)]">
              <h2 className="font-display italic text-xl text-[#1A1A1A] flex items-center gap-2">
                <Users size={22} className="text-[#C4A265]" />Your Collection
              </h2>
              <button onClick={closeDrawer} className="text-[#9A9A9A] hover:text-[#1A1A1A] p-1.5 rounded-lg hover:bg-[#F5F0E8] transition-colors"><X size={22} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {profiles.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <Users size={48} className="mb-4 text-[#E8D5B5]" />
                  <p className="font-display italic text-lg text-[#9A9A9A]">No creators yet</p>
                  <p className="text-sm text-[#C4A265] mt-2">Browse and add creators to build your collection.</p>
                </div>
              ) : (
                profiles.map((profile) => (
                  <div key={profile.user_id} data-list-item>
                    <ListItem profile={profile} onRemove={removeProfile} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>, document.body
      )}
    </>
  );
}
