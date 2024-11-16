import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import { errorHandler } from './middleware/error';
import { requestId } from './middleware/requestId';
import { apiLimiter } from './middleware/rateLimiter';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from './docs';

const app = express();

// 基础中间件
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestId);

// 日志
if (config.nodeEnv !== 'test') {
  app.use(morgan('combined'));
}

// 速率限制
app.use('/api/', apiLimiter);

// 路由
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 错误处理
app.use(errorHandler);

// 仅在非生产环境下启用 API 文档
if (config.nodeEnv !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
}

export default app;