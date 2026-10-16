import app from './app.js';
import { env } from './config/env.js';
import { testDbConnection, poolConnection } from './db/index.js';
import { logger } from './utils/logger.js';

const PORT = env.PORT;

const server = app.listen(PORT, async () => {
  logger.info(`🚀 ESSP Server running on port ${PORT} in [${env.NODE_ENV}] mode`);
  logger.info(`🔗 API Base URL: http://localhost:${PORT}${env.API_PREFIX}`);

  const dbConnected = await testDbConnection();
  if (dbConnected) {
    logger.info('✅ MySQL database connected successfully via Drizzle ORM');
  } else {
    logger.warn('⚠️  Could not connect to MySQL. Ensure MySQL server is running and check DATABASE_URL in .env');
  }
});

// Graceful shutdown
const shutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    try {
      await poolConnection.end();
      logger.info('MySQL connection pool closed.');
    } catch (err) {
      logger.error('Error closing database pool:', err);
    }
    process.exit(0);
  });

  // Force shutdown after timeout
  setTimeout(() => {
    logger.error('Forcefully terminating process after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});
