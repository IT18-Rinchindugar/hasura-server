import { auth } from 'firebase-admin';

export const resolvers = {
  Query: {
    userProfile: async (_:any, args: any) => {
      if (!args.id) return null;
      const { uid, email, displayName } = await auth().getUser(args.id);
      return {
        id: uid,
        email,
        displayName,
      };
    },
  },
};

export default resolvers;
