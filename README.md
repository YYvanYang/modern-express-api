# Modern Express API

A production-ready RESTful API built with Express 5, Drizzle ORM, and Docker, following modern best practices and cloud-native principles.

## 🚀 Features

- **Framework & Language**
  - Express 5 with TypeScript 5
  - Modern ECMAScript features
  - Type-safe development

- **Database & ORM**
  - PostgreSQL 16 with advanced features
  - Drizzle ORM for type-safe queries
  - Automated migrations
  - Connection pooling

- **Authentication & Security**
  - JWT-based authentication
  - Role-based access control
  - Rate limiting
  - Helmet security headers
  - CORS protection
  - Input validation

- **Docker & DevOps**
  - Multi-stage builds
  - Development & Production configurations
  - Health checks
  - Resource management
  - Container orchestration
  - Logging & Monitoring

- **API Features**
  - OpenAPI/Swagger documentation
  - Request validation
  - Error handling
  - Pagination
  - Filtering
  - Sorting
  - Field selection

- **Development Experience**
  - Hot reload
  - Docker compose setup
  - Database GUI (pgAdmin)
  - Type checking
  - Linting & Formatting
  - Git hooks

## 📋 Prerequisites

- Docker Engine 24.0+
- Docker Compose V2
- Node.js 20+ (for local development)
- npm 10+ or Yarn 4+

## 🏗️ Project Structure

```bash
.
├── src/                      # Application source code
│   ├── config/              # Configuration management
│   ├── controllers/         # Request handlers
│   ├── db/                  # Database and ORM setup
│   ├── middleware/          # Express middleware
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   ├── app.ts              # Express application setup
│   └── server.ts           # Server entry point
├── docker/                  # Docker configuration
│   ├── postgres/           # PostgreSQL configuration
│   │   └── init/          # DB initialization scripts
│   └── api/               # API service Dockerfiles
├── scripts/                # Utility scripts
├── docs/                   # Documentation
├── compose.yml            # Development Docker Compose
├── compose.prod.yml       # Production Docker Compose
└── package.json           # Project metadata
```

## 🚀 Quick Start

### Development Environment

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/modern-express-api.git
cd modern-express-api
```

2. **Setup environment**
```bash
cp .env.example .env
```

3. **Start development environment**
```bash
# Install dependencies (if running locally)
npm install

# Start Docker services with hot reload
npm run docker:dev
```

### Available Services

- API: http://localhost:3000
- API Documentation: http://localhost:3000/api-docs
- pgAdmin: http://localhost:5050

### Development Commands

```bash
# Start services with hot reload
npm run docker:dev

# View service status
npm run docker:ps

# View logs
npm run docker:logs

# Stop services
npm run docker:down

# Run database migrations
npm run db:migrate

# Access database CLI
npm run db:cli
```

## 🌐 Production Deployment

### 1. Environment Setup

```bash
# Copy production environment template
cp .env.production.example .env.production

# Edit production environment variables
nano .env.production
```

### 2. Deploy Services

```bash
# Build production images
docker compose -f compose.prod.yml build

# Start production services
docker compose -f compose.prod.yml up -d

# Run production migrations
docker compose -f compose.prod.yml exec api npm run db:migrate:prod
```

### 3. Monitoring & Maintenance

```bash
# View production logs
docker compose -f compose.prod.yml logs -f

# Check service health
docker compose -f compose.prod.yml ps

# Create database backup
npm run db:backup:prod

# Restore database
npm run db:restore:prod
```

### Production Features

- Multi-stage Docker builds
- Resource constraints
- Health checks
- Automatic restarts
- Secure configuration
- Logging rotation
- Database backups
- Zero-downtime deployments

## 🔒 Security

### Implemented Measures

- Helmet security headers
- Rate limiting
- CORS protection
- SQL injection prevention
- XSS protection
- CSRF protection
- Password hashing
- JWT token security
- Input validation
- Error sanitization

### Environment Security

- Non-root container user
- Minimal base images
- Dependencies audit
- Security headers
- Restricted network access
- Encrypted secrets

## 📊 Database Management

### Local Development

Access pgAdmin at http://localhost:5050:
- Email: admin@admin.com
- Password: admin

### Database Commands

```bash
# Create migration
npm run db:generate

# Apply migrations
npm run db:migrate

# Reset database
npm run db:reset

# Create backup
npm run db:backup

# View migration status
npm run db:status
```

## 🔍 API Documentation

### OpenAPI/Swagger

Access the interactive API documentation at http://localhost:3000/api-docs

### Main Endpoints

```bash
# Authentication
POST   /api/v1/auth/register    # Register new user
POST   /api/v1/auth/login       # Login user

# Users
GET    /api/v1/users           # List users (Admin)
GET    /api/v1/users/:id       # Get user
PATCH  /api/v1/users/:id       # Update user
DELETE /api/v1/users/:id       # Delete user (Admin)
```

## 🛠️ Development Guidelines

### Code Style

```bash
# Run linter
npm run lint

# Run formatter
npm run format

# Run type check
npm run type-check
```

### Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

### Git Workflow

1. Create feature branch
```bash
git checkout -b feature/your-feature
```

2. Commit changes using conventional commits
```bash
git commit -m "feat: add new feature"
```

3. Push and create PR
```bash
git push origin feature/your-feature
```

## 🔧 Troubleshooting

### Common Issues

1. **Services won't start**
```bash
# Remove volumes and rebuild
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

2. **Database connection issues**
```bash
# Check database logs
docker compose logs postgres

# Reset database
npm run db:reset
```

3. **File changes not reflecting**
```bash
# Restart development mode
npm run docker:down
npm run docker:dev
```

## 📈 Monitoring & Logging

### Local Development

- Access logs via Docker Compose
- Monitor API health endpoint
- Database monitoring via pgAdmin

### Production

- JSON formatted logs
- Log rotation
- Resource monitoring
- Health checks
- Error tracking
- Performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### Contribution Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Include tests
- Update documentation
- Follow existing code style

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Express.js team
- Drizzle ORM team
- Docker team
- TypeScript team
- Open source community

## 📫 Support

- Create an issue
- Join our Discord community
- Check FAQ in wiki
- Contact maintainers

---

Built with ❤️ by [Claude.AI & Yvan]