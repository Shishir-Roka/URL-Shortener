import db from "../db/index.js";
import { usersTable } from "../Module/user.model.js";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email) {
  const [existingEmail] = await db
    .select({
      email: usersTable.email,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      salt: usersTable.salt,
      password:usersTable.password
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return existingEmail;
}

export async function createUser({
  firstName,
  lastName,
  email,
  password,
  salt,
}) {
  const [insertUser] = await db
    .insert(usersTable)
    .values({ firstName, lastName, email, password, salt })
    .returning({ id: usersTable.id });

  return insertUser;
}
