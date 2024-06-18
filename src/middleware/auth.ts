import { GraphQLError } from "graphql";

export const checkAuthenticated = (context: any) => {
  if (!context.user) {
    throw new GraphQLError("Unauthorized", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
};