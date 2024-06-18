import { prismaClient } from "../lib/db";

export interface PostPayload {
  title: string;
  content: string;
  authorId: string;
}
export class PostService {
  public static createPost(payload: PostPayload) {
    return { id: "" };
  }
}
