import db from "../db/index.js";
import { urlsTable } from "../Module/index.js";
import { eq } from "drizzle-orm"

export async function createShortenURl({targetURl, shortCode, userID }) {
    const [result] = await db
    .insert(urlsTable)
    .values({ targetURl, shortCode, userID })
    .returning({
      id: urlsTable.id,
      targetURL: urlsTable.targetURl,
      shortCode: urlsTable.shortCode,
    });

     return result;
} 
export async function checkShortenURl(code) {
    const [result] = await db
    .select().from(urlsTable).where(eq(urlsTable.shortCode,code));
   
     return result;
} 