import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-border/50 shadow-xl">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <h1 className="text-2xl font-bold font-serif text-foreground">404 Page Not Found</h1>
            </div>

            <p className="mt-4 text-muted-foreground font-serif italic text-lg">
              "The page you are looking for seems to have gotten lost in the mail."
            </p>

            <div className="mt-8">
              <Link href="/">
                <Button className="w-full bg-primary hover:bg-primary/90 rounded-full">
                  Return Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
