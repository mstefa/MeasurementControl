import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
  app: {
    name: string;
    env: string;
  };
  server: {
    port: number;
    host?: string;
  }
}

const config: AppConfig = {
  app: {
    name: 'test-api',
    env: process.env.NODE_ENV || 'prod'
  },
  server: {
    port: parseInt(process.env.SERVER_PORT || '4000'),
    host: process.env.SERVER_HOST as string
  }
};

export { AppConfig, config };
