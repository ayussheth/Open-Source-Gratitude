import { useRoute } from "wouter";
import { useLetter } from "@/hooks/use-letters";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Link, Check, Copy, Twitter, Linkedin, ArrowLeft } from "lucide-react";
import { useState } from "react";
import NotFound from "./not-found";

export default function LetterView() {
  const [, params] = useRoute("/letter/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: letter, isLoading, error } = useLetter(id);
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return <LetterSkeleton />;
  }

  if (error || !letter) {
    return <NotFound />;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({ description: "Link copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Read this beautiful letter to ${letter.recipient} on Love Letters to Open Source.`;
  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-24 px-4">
        <div className="container max-w-3xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to letters
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-card shadow-xl shadow-stone-200/50 rounded-lg p-8 md:p-16 border border-stone-100 relative overflow-hidden"
          >
            {/* Paper texture overlay */}
            <div className="absolute inset-0 bg-[#fffdf5] opacity-50 mix-blend-multiply pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200 pb-8 mb-8 gap-4">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">To: {letter.recipient}</h2>
                  <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                    {letter.title}
                  </h1>
                </div>
                <time className="text-sm text-muted-foreground font-serif italic whitespace-nowrap">
                  {format(new Date(letter.createdAt), "MMMM do, yyyy")}
                </time>
              </div>

              <div className="prose prose-lg prose-stone max-w-none font-serif">
                {letter.content.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 leading-relaxed text-stone-800 text-xl">{paragraph}</p>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Written by</span>
                  <span className="font-handwriting text-2xl text-foreground font-bold rotate-[-2deg] inline-block">
                    {letter.authorName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handleCopyLink} className="rounded-full w-10 h-10 border-stone-200 hover:border-primary hover:text-primary transition-colors">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-stone-200 hover:border-primary hover:text-primary transition-colors">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </a>

                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-stone-200 hover:border-primary hover:text-primary transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function LetterSkeleton() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-24 px-4">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="bg-card shadow-xl rounded-lg p-8 md:p-16 border border-stone-100 h-[600px] flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-3/4" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
