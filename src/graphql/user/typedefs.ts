export const typeDefs = `#graphql
    type User{
        id:ID!
        firstName:String!
        lastName:String
        email:String!
        profileImageUrl:String
    }

    type Post{
        id: ID!, 
        title:String!
        content:String
        authorId: ID!
    }
`;
