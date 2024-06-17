import { prismaClient } from "../lib/db";
import { createHmac, randomBytes } from "crypto";
import JWT from "jsonwebtoken";

const JWT_SECRET_KEY = "$uperM@n123";

export interface createUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface getUserTokenPassword {
  email: string;
  password: string;
}

export class UserService {
  private static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return hashedPassword;
  }

  public static async createUser(payload: createUserPayload) {
    const { firstName, lastName, email, password } = payload;

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = await UserService.generateHash(salt, password);

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt,
      },
    });
  }

  public static async getUserToken(payload: getUserTokenPassword) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);

    if (!user) throw new Error("User not found!");

    const userSault = user.salt;
    const userHashedPassword = await UserService.generateHash(
      userSault,
      password
    );

    if (userHashedPassword != user.password)
      throw new Error("Invalid password!");

    //Generate token
    const token = JWT.sign({ is: user.id, email: user.email }, JWT_SECRET_KEY);

    return token;
  }
}
