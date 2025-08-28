import express from "express"
import db from '../db/index.js'
import { usersTable } from "../Modules/user.model.js";
import { eq } from "drizzle-orm";


const router = express();

router.post("/",async (req,res)=>{
  const { firstName, lastName , email, password } =req.body;

  const [existingUser] = await db.select({id:usersTable.id}).from(usersTable).where(eq(usersTable.email.email));
})

  if(existingUser){res.status(400).json({erro:"Email already exist"}) }

export default router;