import express from "express";
import { shortenPostRequestSchema } from "../validations/request.validation.js";
import { nanoid } from "nanoid";
import { ensureAuthentication } from "../Middleware/authMiddleware.js";
import { createShortenURl , checkShortenURl} from "../services/url.service.js";
import db from "../db/index.js";
import { and, eq } from "drizzle-orm";
import { urlsTable } from "../Module/url.model.js";

const router = express.Router();

router.post("/shorten", ensureAuthentication, async (req, res) => {
  try {
    const userID = req.user.id;

    const validationResult = await shortenPostRequestSchema.safeParseAsync(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        success: false,
        message: "URl required",
        errors: validationResult.error.format(),
      });
    }

    const { code, url } = validationResult.data;

    if(code){
      const duplicate = await checkShortenURl(code);
      if(duplicate){
         return res.status(400).json({
        success: false,
        message: "short URl already exits",
      });
      }

    }
    
    const shortCode = code ?? nanoid(6);

 
    const result = await createShortenURl({
      targetURl: url,
      shortCode,
      userID,
    });

    return res.status(201).json({
      success: true,
      data: {
        id: result.id,
        shortCode: result.shortCode,
        targetUrl: result.targetURL,
      },
      message: "Short URL created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
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
