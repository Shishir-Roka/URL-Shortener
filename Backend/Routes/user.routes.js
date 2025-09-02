import express from "express";
import {
  signupPostRequestBodySchema,
  loginPostRequestBodySchema,

} from "../validations/request.validation.js";
import { hashedPasswordWithSalt } from "../utils/hash.js";
import { getUserByEmail, createUser } from "../services/user.service.js";
import { createUserToken } from "../utils/token.js";
import { ensureAuthentication } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", ensureAuthentication, async (req, res) => {
    const user = req.user
    res.json({data:user})

});

router.post("/signup", async (req, res) => {
  try {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        success: false,
        message: "Invalidation Credentials ",
        errors: validationResult.error.format(),
      });
    }

    const { firstName, lastName, email, password } = validationResult.data;

    // Check if email already exists
    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const { salt, hashedPass } = hashedPasswordWithSalt(password);

    // Create user
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

    // Set cookie
    res.cookie("token", usertoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    return res.status(201).json({
      success: true,
      data: {
        userID: newUser.id,
        name: newUser.firstName,
        email: newUser.email,
      },
      message: "Signup successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});


router.post("/login", async (req, res) => {
  try {
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.format(),
      });
    }

    const { email, password } = validationResult.data;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User with ${email} does not exist`,
      });
    }

    const { hashedPass } = hashedPasswordWithSalt(password, user.salt);
    if (user.password !== hashedPass) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = { id: user.id, name: user.firstName, email: user.email };
    const usertoken = createUserToken(payload);

    res.cookie("token", usertoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({
      success: true,
      data: { id: user.id, name: user.firstName, email: user.email },
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
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
