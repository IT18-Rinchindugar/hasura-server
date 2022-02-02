import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type UserProfile {
        id: String
        email: String
        displayName: String
    }

    type Query {
        firebase_user_profile(id: String): UserProfile
    }
`;

export default typeDefs;
