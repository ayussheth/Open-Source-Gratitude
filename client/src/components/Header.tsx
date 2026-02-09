import { Link, useLocation } from "wouter";
import { Heart, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity">
          <div className="relative">
            <Heart className="w-6 h-6 text-primary fill-primary/20 group-hover:fill-primary/40 transition-colors" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping opacity-75" />
          </div>
          <span className="font-serif font-bold text-lg md:text-xl tracking-tight text-foreground">
            Love Letters <span className="text-muted-foreground font-sans font-normal text-sm md:text-base">to Open Source</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
              Read Letters
            </Button>
          </Link>
          
          {location !== "/write" && (
            <Link href="/write">
              <Button className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 rounded-full px-6">
                <PenLine className="w-4 h-4" />
                Write a Letter
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
