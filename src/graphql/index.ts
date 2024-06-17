import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { User } from "./user/index";
import { prismaClient } from "../lib/db";

async function createGraphqlServer() {
  //create graphql server
  const gqlServer = new ApolloServer({
    typeDefs: gql`
      type Query {
        hello: String
      }

      type Mutation {
        createUser(
          firstName: String!
          lastName: String!
          email: String!
          password: String!
        ): Boolean
      }
    `,
    resolvers: {
      Query: { ...User.resolvers.queries },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          try {
            const result = await prismaClient.user.create({
              data: {
                firstName,
                lastName,
                email,
                password,
                salt: "testtt",
              },
            });
            console.log(result);
          } catch (error) {
            console.log(error);
          }
          return true;
        },
      },
    },
  });

  await gqlServer.start();

  return gqlServer;
}

export default createGraphqlServer;
