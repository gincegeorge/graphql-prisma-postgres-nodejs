import { ApolloServer } from "@apollo/server";
import { User } from "./user/index";

async function createGraphqlServer() {
  //create graphql server
  const gqlServer = new ApolloServer({
    typeDefs: `#graphql
    
      ${User.typeDefs}

      type Query {
        ${User.queries}
        getContext:String
      }

      type Mutation {
        ${User.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries
      },
      Mutation: { ...User.resolvers.mutations },
    },
  });

  await gqlServer.start();

  return gqlServer;
}

export default createGraphqlServer;
