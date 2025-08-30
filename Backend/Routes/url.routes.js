import express from "express";
import { shortenPostRequestSchema } from "../validations/request.validation.js";
import { nanoid } from "nanoid";
import db from "../db/index.js";
import { urlsTable } from "../Module/url.model.js";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const userID = req.user?.id;
  
  if (!userID) {
    return res.status(401).json({ error: "You must login to access the page" });
  }

  const validationResult = await shortenPostRequestSchema.safeDecodeAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }
  const { code, url } = validationResult.data;

  const shortCode = code ?? nanoid(6);

  const [result] = await db
    .insert(urlsTable)
    .values({ targetURl: url, shortCode, userID })
    .returning({ id: urlsTable.id,targetUR:urlsTable.targetURl,shortCode:urlsTable.shortCode  });

    res.status(200).json({id:result.id, shortCode: result.shortCode, targetURl : result.targetUR})
});

export default router;
