import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createGraphqlServer from "./graphql";
import dotenv from "dotenv";
import { UserService } from "./services/user";

(async function () {
  const app = express();
  const PORT = Number(process.env.PORT || 8000);

  app.use(express.json());
  dotenv.config();

  app.get("/", (req, res) => {
    res.json({ message: "Server running" });
  });

  app.use(
    "/graphql",
    expressMiddleware(await createGraphqlServer(), {
      context: async ({ req }) => {
        const token = req.headers["token"];
        try {
          const user = UserService.decodeJWTToken(token as string);
          return { user };
        } catch (error) {
          return { user: null };
        }
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
})();
