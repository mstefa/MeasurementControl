import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors';
import express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import { WebSocketServer } from "ws";

import { resolvers } from "./infrastructure/graphql/MeasurementResolvers";
import { typeDefs } from "./infrastructure/graphql/MeasurementSchema";
import { ReadMeasurement } from "./measurement/aplication/ReadMeasurement";
import { GraphQlEventBus } from "./measurement/infrastructure/GraphQlEventBus";
import { PostMeasurement } from "./measurement/infrastructure/PostMesaurements";
import { StaticPartRepository } from "./measurement/infrastructure/StaticPartRepository";
import { Logger } from "./shared/infrastructure/logger/Logger";


const partRepository: StaticPartRepository = new StaticPartRepository();
const eventBus: GraphQlEventBus = new GraphQlEventBus();
const readMeasurement: ReadMeasurement = new ReadMeasurement(partRepository, eventBus)
const postMeasurement: PostMeasurement = new PostMeasurement(partRepository.search('partName'), readMeasurement);


export async function startApolloServer(port: number) {

  // Create http Server
  const app = express();
  const httpServer = http.createServer(app);

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // serves ws add a diferent path
    path: '/subscriptions',
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  // Create Apollo Server 

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });



  await apolloServer.start();

  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer));

  // await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  await httpServer.listen(port)

  Logger.info(`GraphQL queries ready at http://localhost:${port}/`);
  Logger.info(`Subscription ready at ws://localhost:${port}/subscriptions`);

  postMeasurement.run() // MOCKED
}


