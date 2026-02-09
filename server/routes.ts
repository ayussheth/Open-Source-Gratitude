import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.letters.list.path, async (req, res) => {
    const letters = await storage.getLetters();
    res.json(letters);
  });

  app.post(api.letters.create.path, async (req, res) => {
    try {
      const input = api.letters.create.input.parse(req.body);
      const letter = await storage.createLetter(input);
      res.status(201).json(letter);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.letters.get.path, async (req, res) => {
    const letter = await storage.getLetter(Number(req.params.id));
    if (!letter) {
      return res.status(404).json({ message: 'Letter not found' });
    }
    res.json(letter);
  });

  // Seed data if empty
  const existing = await storage.getLetters();
  if (existing.length === 0) {
    await storage.createLetter({
      title: "Thank you for Linux",
      recipient: "Linus Torvalds & Contributors",
      content: "Thank you for building the foundation of the modern internet. Your work has enabled countless careers, innovations, and dreams. It's impossible to overstate the impact of the kernel.",
      authorName: "A grateful dev",
    });
    await storage.createLetter({
      title: "To the React Team",
      recipient: "React Core Team",
      content: "React changed how I think about UI development. The component model, the ecosystem, and the community have made web development a joy. Thank you for your continued innovation.",
      authorName: "Frontend Fan",
    });
    await storage.createLetter({
      title: "Appreciation for curl",
      recipient: "Daniel Stenberg",
      content: "curl is the unsung hero of every developer's toolkit. It just works, everywhere, every time. Thank you for maintaining such a critical piece of infrastructure for so long.",
      authorName: "Backend Builder",
    });
  }

  return httpServer;
}
