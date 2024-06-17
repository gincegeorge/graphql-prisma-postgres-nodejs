import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createGraphqlServer from "./graphql";
import dotenv from "dotenv";

(async function () {
  const app = express();
  const PORT = Number(process.env.PORT || 8000);

  app.use(express.json());
  dotenv.config();

  app.get("/", (req, res) => {
    res.json({ message: "Server running" });
  });

  app.use("/graphql", expressMiddleware(await createGraphqlServer()));

  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
})();
