import express, { query } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { gql } from "graphql-tag";

//IIFE
(async function () {
  const app = express();
  const PORT = Number(process.env.PORT || 8000);

  app.use(express.json());

  //create graphql server
  const gqlServer = new ApolloServer({
    typeDefs: gql`
      type Query {
        hello: String
        say(name: String): String
      }
    `,
    resolvers: {
      Query: {
        hello: () => {
          return "helloooooo";
        },
        say: (_, { name }) => {
            return `Helloo ${name}`
        },
      },
    },
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Server running" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
})();
