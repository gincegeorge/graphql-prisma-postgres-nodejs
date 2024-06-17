import { UserService, createUserPayload } from "../../services/user";

const queries = {
  getUserToken: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const token = await UserService.getUserToken(payload);
    return token;
  },
  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const user = await UserService.getUserById(context.user.id);
      return user;
    }
    throw new Error("I don't know who you are!!");
  },
};

const mutations = {
  createUser: async (_: any, payload: createUserPayload) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },
};

export const resolvers = { queries, mutations };
