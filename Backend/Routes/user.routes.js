import express from "express";
import db from "../db/index.js";
import { usersTable } from "../Module/user.model.js";
import { signupPostRequestBodySchema } from "../validations/request.validation.js";
import { eq } from "drizzle-orm";
import {randomBytes , createHmac} from "crypto"

const router = express.Router();

router.get("/", async (req, res) => {
  const [users] = await db.select().from(usersTable);
  res.json({ data: users });
});

router.post("/signup", async (req, res) => {
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(
    req.body
  );
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }
  console.log(validationResult.data);
  const { firstName, lastName, email, password } = validationResult.data;
  const [existingEmail] = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (existingEmail) {
    return res.status(400).json({ error: "Email already exists" });
  }
  const salt = randomBytes(256).toString("hex");
  const hashedPass = createHmac("sha256", salt).update(password).digest("hex");
  const [insertUser] = await db
    .insert(usersTable)
    .values({ firstName, lastName, email, password: hashedPass, salt })
    .returning({ id: usersTable.id });
  return res.status(200).json({ data: { userID: insertUser.id } });
});

export default router;
