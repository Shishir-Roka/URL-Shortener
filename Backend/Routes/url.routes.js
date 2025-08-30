import express from "express";
import { shortenPostRequestSchema } from "../validations/request.validation.js";
import { nanoid } from "nanoid";
import { ensureAuthentication } from "../Middleware/authMiddleware.js";
import { createShortenURl } from "../services/url.service.js";
import db from "../db/index.js";
import { and, eq } from "drizzle-orm";
import { urlsTable } from "../Module/url.model.js";

const router = express.Router();

router.post("/shorten", ensureAuthentication, async (req, res) => {
  const userID = req.user.id;

  const validationResult = await shortenPostRequestSchema.safeDecodeAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }
  const { code, url } = validationResult.data;

  const shortCode = code ?? nanoid(6);

  const result = await createShortenURl({ targetURl: url, shortCode, userID });

  res.status(200).json({
    id: result.id,
    shortCode: result.shortCode,
    targetURl: result.targetUR,
  });
});

router.get("/codes", ensureAuthentication, async (req, res) => {
  const userId = req.user.id;

  const result = await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.userID, userId));
  res.json({ result });
});

router.delete("/:id", ensureAuthentication, async (req, res) => {
  const codeId = req.params.id;

  const [result] = await db
    .delete(urlsTable)
    .where(and(eq(urlsTable.id, codeId),eq(urlsTable.userID,req.user.id)))
    .returning({ id: urlsTable.id });

  if (!result) {
    return res.status(400).json({ error: "ID not Found" });
  }

  return res.json({ message: `Code with Id ${result.id} is deleted` });
});

router.get("/:shortCode", async (req, res) => {
  const code = req.params.shortCode;

  const [result] = await db
    .select({ targetUR: urlsTable.targetURl })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code));

  if (!result) {
    return res.status(400).json({ error: "Invalid URl" });
  }

  return res.redirect(result.targetUR);
});

export default router;
