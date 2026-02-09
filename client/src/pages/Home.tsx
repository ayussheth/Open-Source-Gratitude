import { useLetters } from "@/hooks/use-letters";
import { LetterCard } from "@/components/LetterCard";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, PenTool, Code2, Users } from "lucide-react";

export default function Home() {
  const { data: letters, isLoading } = useLetters();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-pulse">
                Celebrating the builders & maintainers
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-foreground mb-6 leading-tight">
                Gratitude for the code <br />
                <span className="italic text-muted-foreground font-light">that powers our world.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Open source software is a gift. Maintainers give their time, passion, and creativity often without asking for anything in return. 
                Here, we write them love letters to say <strong>thank you</strong>.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/write">
                  <Button size="lg" className="rounded-full text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
                    <Heart className="mr-2 h-5 w-5 fill-current" />
                    Write a Letter
                  </Button>
                </Link>
                <Button variant="ghost" size="lg" className="rounded-full text-lg px-8 py-6 text-muted-foreground hover:bg-muted/50" onClick={() => {
                  document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Read the Love
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats / Mission */}
        <section className="border-y border-border/40 bg-white/30 backdrop-blur-sm py-12">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg">Celebrate Code</h3>
                <p className="text-sm text-muted-foreground max-w-xs">Acknowledge the libraries and frameworks that make our work possible.</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg">Honor People</h3>
                <p className="text-sm text-muted-foreground max-w-xs">Recognize the humans behind the avatars who review PRs and fix bugs.</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-2">
                  <PenTool className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg">Share Gratitude</h3>
                <p className="text-sm text-muted-foreground max-w-xs">A simple "thank you" can mean the world to a maintainer facing burnout.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feed Section */}
        <section id="feed" className="py-20 bg-secondary/30">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-serif font-bold text-foreground">Latest Letters</h2>
              {!isLoading && letters && (
                <span className="text-sm text-muted-foreground font-medium px-3 py-1 bg-white rounded-full border border-border">
                  {letters.length} letters shared
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 bg-muted/20 animate-pulse rounded-xl border border-border/50" />
                ))}
              </div>
            ) : letters?.length === 0 ? (
              <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-border">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PenTool className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">No letters yet</h3>
                <p className="text-muted-foreground mb-6">Be the first to share some love with the community.</p>
                <Link href="/write">
                  <Button className="rounded-full">Write the first letter</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {letters?.map((letter, i) => (
                  <LetterCard key={letter.id} letter={letter} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="py-8 bg-background border-t border-border/40 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 font-serif italic text-lg opacity-80">
            Made with <Heart className="w-4 h-4 fill-red-400 text-red-400" /> for Open Source
          </div>
          <p>© {new Date().getFullYear()} Love Letters to Open Source.</p>
        </div>
      </footer>
    </div>
  );
}
