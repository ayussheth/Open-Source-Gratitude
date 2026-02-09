import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertLetterSchema } from "@shared/schema";
import { useCreateLetter } from "@/hooks/use-letters";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { Loader2, SendHorizontal, Heart } from "lucide-react";

const formSchema = insertLetterSchema.extend({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  recipient: z.string().min(1, "Recipient is required"),
  authorName: z.string().min(1, "Your name is required"),
  content: z.string().min(10, "Letter must be at least 10 characters").max(5000, "Letter too long"),
});

export default function Write() {
  const mutation = useCreateLetter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      recipient: "",
      content: "",
      authorName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-20 px-4">
        <div className="container max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <span className="text-primary font-medium tracking-wide uppercase text-xs mb-2 block">Spread Kindness</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Write a Love Letter</h1>
              <p className="text-muted-foreground text-lg">
                Tell a project or maintainer why their work matters to you.
              </p>
            </div>

            <div className="bg-card rounded-2xl shadow-xl shadow-black/5 border border-border/60 p-6 md:p-10 relative overflow-hidden">
              {/* Decorative top strip */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="recipient"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground font-normal">Dear...</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="React Team, Linus Torvalds, etc." 
                              className="h-12 text-lg font-serif border-x-0 border-t-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 bg-transparent placeholder:text-muted-foreground/40"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="authorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground font-normal">From...</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your Name" 
                              className="h-12 text-lg font-serif border-x-0 border-t-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 bg-transparent placeholder:text-muted-foreground/40"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground font-normal">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Thank you for changing my career" 
                            className="h-14 text-2xl font-serif font-bold border-x-0 border-t-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 bg-transparent placeholder:text-muted-foreground/40"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Letter Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write your letter here... Express your gratitude, share your story, and let them know the impact they've made." 
                            className="min-h-[300px] text-lg leading-relaxed font-serif italic border-none resize-none focus-visible:ring-0 bg-[linear-gradient(transparent_1.9rem,#00000010_2rem)] bg-[length:100%_2rem] focus:bg-[length:100%_2rem] px-0 -mx-2"
                            style={{ lineHeight: '2rem' }}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-6 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground hidden sm:block">
                      Your letter will be public and shared with the community.
                    </p>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full sm:w-auto rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Publish Letter
                          <SendHorizontal className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
