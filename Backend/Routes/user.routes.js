import express from "express";
import db from "../db/index.js";
import { usersTable } from "../Module/user.model.js";
import {
  signupPostRequestBodySchema,
  loginPostRequestBodySchema,
} from "../validations/request.validation.js";
import { hashedPasswordWithSalt } from "../utils/hash.js";
import { getUserByEmail, createUser } from "../services/user.service.js";
import { createUserToken } from "../utils/token.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await db.select().from(usersTable);
  res.json({ data: users });
});

router.post("/signup", async (req, res) => {
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { firstName, lastName, email, password } = validationResult.data;

  const existingEmail = await getUserByEmail(email);

  if (existingEmail) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const { salt, hashedPass } = hashedPasswordWithSalt(password);

  const newUser = await createUser({
    firstName,
    lastName,
    email,
    password: hashedPass,
    salt,
  });
  const payload = {
    id: newUser.id,
    name: newUser.firstName,
    email: newUser.email,
  };

  const usertoken = createUserToken(payload);

  res.cookie("token", usertoken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  return res
    .status(200)
    .json({
      data: {
        userID: newUser.id,
        name: newUser.firstName,
        email: newUser.email,
        usertoken,
      },
      message: "Signup successful",
    });
});

router.post("/login", async (req, res) => {
  const validationResult = await loginPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { email, password } = validationResult.data;

  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(400).json({ error: `User with ${email} does not exits` });
  }

  const { hashedPass } = hashedPasswordWithSalt(password, user.salt);

  if (user.password != hashedPass) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const payload = { id: user.id, name: user.firstName, email: user.email };

  const usertoken = createUserToken(payload);

  res.cookie("token", usertoken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  return res
    .status(200)
    .json({
      data: { id: user.id, name: user.firstName, email: user.email, usertoken },
      message: "Login successful",
    });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Logged out successfully" });
});

export default router;
