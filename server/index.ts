import { startApolloServer } from './src/server';
import { config } from './src/shared/config/appConfig';
import { Logger } from './src/shared/infrastructure/logger/Logger';

const port = config.server.port || 4000;

try {
  startApolloServer(port);
} catch (e) {
  Logger.error(e);
  process.exit(1);
}
