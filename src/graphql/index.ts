import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { User } from "./user/index";

async function createGraphqlServer() {
  //create graphql server
  const gqlServer = new ApolloServer({
    typeDefs: gql`

      type Query {
        ${User.typeDefs}
        ${User.queries}
      }

      type Mutation {
        ${User.mutations}
      }
    `,
    resolvers: {
      Query: { ...User.resolvers.queries },
      Mutation: { ...User.resolvers.mutations },
    },
  });

  await gqlServer.start();

  return gqlServer;
}

export default createGraphqlServer;
