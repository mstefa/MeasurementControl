import { PubSub } from 'graphql-subscriptions'; // syms a pubSub service

export const pubsub = new PubSub();

export const resolvers = {

  Subscription: {
    measurement: {
      subscribe: () => pubsub.asyncIterator(['MEASUREMENT_CREATED']),
    },
  },

};

