import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ListDrawer } from "./list/ListDrawer";
import { usePageEntrance } from "@/hooks/useGsap";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const pageRef = usePageEntrance<HTMLDivElement>();

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#FAFAF8] text-neutral-900 font-sans selection:bg-[rgba(196,162,101,0.25)]"
    >
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-30 bg-[#FAFAF8]/85 backdrop-blur-lg border-b border-[rgba(193,162,101,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 group no-underline"
          >
            <span className="text-[#C4A265] text-xl leading-none select-none">◆</span>
            <span
              className="font-display text-2xl font-semibold italic text-[#1A1A1A] tracking-wide
                         group-hover:tracking-widest transition-all duration-500"
            >
              Wobb
            </span>
          </Link>
          <ListDrawer />
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {title && (
          <div className="mb-8 text-center md:text-left">
            <h1 className="font-display italic text-3xl md:text-5xl font-semibold text-[#1A1A1A] tracking-tight mb-2">
              {title}
            </h1>
            <div className="w-16 h-0.5 bg-[#C4A265] mt-4 mx-auto md:mx-0" />
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
