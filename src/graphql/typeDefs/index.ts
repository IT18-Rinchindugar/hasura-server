import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type UserProfile {
        id: String
        email: String
        displayName: String
    }

    type Query {
        userProfile(id: String): UserProfile
    }
`;
