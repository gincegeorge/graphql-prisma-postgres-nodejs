import { PostPayload, PostService } from "../../services/post";

const queries = {};

const mutations = {
  createUser: async (_: any, payload: PostPayload) => {
    const res = await PostService.createPost(payload);
    return res.id;
  },
};

export const resolvers = { queries, mutations };
