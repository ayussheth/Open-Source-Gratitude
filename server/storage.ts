import { db } from "./db";
import { letters, type InsertLetter, type Letter } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createLetter(letter: InsertLetter): Promise<Letter>;
  getLetters(): Promise<Letter[]>;
  getLetter(id: number): Promise<Letter | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createLetter(letter: InsertLetter): Promise<Letter> {
    const [newLetter] = await db.insert(letters).values(letter).returning();
    return newLetter;
  }

  async getLetters(): Promise<Letter[]> {
    return await db.select().from(letters).orderBy(desc(letters.createdAt));
  }

  async getLetter(id: number): Promise<Letter | undefined> {
    const [letter] = await db.select().from(letters).where(eq(letters.id, id));
    return letter;
  }
}

export const storage = new DatabaseStorage();
