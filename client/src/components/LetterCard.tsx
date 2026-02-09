import { Link } from "wouter";
import { type Letter } from "@shared/schema";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface LetterCardProps {
  letter: Letter;
  index: number;
}

export function LetterCard({ letter, index }: LetterCardProps) {
  // Truncate content for preview
  const preview = letter.content.length > 180 
    ? letter.content.slice(0, 180) + "..." 
    : letter.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/letter/${letter.id}`}>
        <div className="group h-full bg-card hover:bg-white border border-border/50 hover:border-primary/20 rounded-xl p-6 md:p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 relative overflow-hidden">
          {/* Decorative corner fold */}
          <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-muted to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex flex-col h-full justify-between gap-6">
            <div>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-1 block">To</span>
                <h3 className="text-xl font-bold font-serif text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {letter.recipient}
                </h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed font-serif italic text-lg line-clamp-4">
                "{preview}"
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-border/30 pt-4 mt-auto">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">From</span>
                <span className="font-medium text-foreground text-sm">{letter.authorName}</span>
              </div>
              <time className="text-xs text-muted-foreground tabular-nums">
                {format(new Date(letter.createdAt), "MMM d, yyyy")}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
