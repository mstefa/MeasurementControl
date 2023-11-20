import { gql } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MEASUREMENT_SUBSCRIPTION: any = gql(`
  subscription Measurement {
    measurement {
      partName
      features {
        name
        status
        controls {
          deviation
          status
          name
          deviationOutOfTolerance
          }
        }
      }
    }`);


const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/subscriptions',
  })
);

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
