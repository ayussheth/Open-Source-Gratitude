import { Link, useLocation } from "wouter";
import { Heart, PenLine, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-primary to-rose-400" />

      <div className="container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer transition-all">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 group-hover:scale-105 transition-all duration-300">
            <Heart className="w-[18px] h-[18px] text-white fill-white/90" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-background" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif font-bold text-base md:text-lg tracking-tight text-foreground">
              Love Letters
            </span>
            <span className="text-muted-foreground font-sans text-[11px] md:text-xs tracking-wide uppercase">
              to Open Source
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className={`hidden sm:inline-flex gap-2 rounded-lg transition-colors ${
                location === "/"
                  ? "text-foreground bg-muted/60"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Read
            </Button>
          </Link>

          {location !== "/write" && (
            <Link href="/write">
              <Button
                size="sm"
                className="gap-2 rounded-lg bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-px transition-all duration-200"
              >
                <PenLine className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Write a Letter</span>
                <span className="sm:hidden">Write</span>
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
