import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { ListDrawer } from "./list/ListDrawer";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300 font-sans selection:bg-purple-500/30">
      <header className="sticky top-0 z-30 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white group">
            <Sparkles className="text-purple-500 group-hover:text-purple-400 transition-colors" size={24} />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Wobb
            </span>
          </Link>
          <ListDrawer />
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {title && (
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
              {title}
            </h1>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
