import app from './app';
import { config } from './config';

const server = app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  server.close((err) => {
    console.log('Server closed');
    process.exit(err ? 1 : 0);
  });
});