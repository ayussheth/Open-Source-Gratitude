import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertLetter, type Letter } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export function useLetters() {
  return useQuery({
    queryKey: [api.letters.list.path],
    queryFn: async () => {
      const res = await fetch(api.letters.list.path);
      if (!res.ok) throw new Error("Failed to fetch letters");
      return api.letters.list.responses[200].parse(await res.json());
    },
  });
}

export function useLetter(id: number) {
  return useQuery({
    queryKey: [api.letters.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.letters.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch letter");
      return api.letters.get.responses[200].parse(await res.json());
    },
    enabled: !isNaN(id),
  });
}

export function useCreateLetter() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  return useMutation({
    mutationFn: async (data: InsertLetter) => {
      const validated = api.letters.create.input.parse(data);
      const res = await fetch(api.letters.create.path, {
        method: api.letters.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.letters.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to publish letter");
      }
      return api.letters.create.responses[201].parse(await res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.letters.list.path] });
      toast({
        title: "Letter Sent",
        description: "Your letter has been published to the world.",
      });
      setLocation(`/letter/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
