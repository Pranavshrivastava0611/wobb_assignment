import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useListStore } from "@/store/useListStore";
import { ListItem } from "./ListItem";

export function ListDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { profiles, removeProfile } = useListStore();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 md:px-4 md:py-2 md:rounded-lg shadow-lg flex items-center gap-2 transition-transform hover:scale-105 relative"
      >
        <Users size={20} />
        <span className="hidden md:inline font-semibold">My List</span>
        {profiles.length > 0 && (
          <span className="absolute -top-2 -right-2 md:static bg-white text-purple-700 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md">
            {profiles.length}
          </span>
        )}
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="relative z-50">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-[100dvh] w-full max-w-sm bg-[#12121a] border-l border-white/10 flex flex-col shadow-2xl"
              >
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Users size={24} className="text-purple-400" />
                    My Selected List
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {profiles.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                      <Users size={48} className="mb-4 opacity-20" />
                      <p>No profiles added yet.</p>
                      <p className="text-sm mt-2">Browse and add profiles to see them here.</p>
                    </div>
                  ) : (
                    profiles.map((profile) => (
                      <ListItem
                        key={profile.user_id}
                        profile={profile}
                        onRemove={removeProfile}
                      />
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
