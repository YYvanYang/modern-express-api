# Modern Express API with Docker

A modern, production-ready RESTful API built with Express 5, Drizzle ORM, and Docker.

## Features

- 🚀 Express 5 with TypeScript
- 🛢️ PostgreSQL with Drizzle ORM
- 🐳 Docker development environment
- 🔐 JWT Authentication
- 👥 Role-based Authorization
- ✅ Request validation with Zod
- 🚦 API rate limiting
- 📝 OpenAPI documentation
- 🔄 Database migrations
- 🛡️ Security best practices

## Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Express 5
- **Language**: TypeScript 5
- **Database**: PostgreSQL 16
- **ORM**: Drizzle ORM
- **Documentation**: OpenAPI/Swagger
- **Containerization**: Docker & Docker Compose
- **Authentication**: JWT
- **Validation**: Zod
- **Testing**: Jest & Supertest

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- npm or yarn
- Git

## Project Structure

```
.
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── db/            # Database and ORM setup
│   ├── middleware/    # Express middleware
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── app.ts         # Express app setup
│   └── server.ts      # Server entry point
├── docker/            # Docker configuration
│   ├── postgres/      # PostgreSQL initialization
│   └── api/           # API service Dockerfile
├── scripts/           # Utility scripts
├── compose.yml        # Docker Compose configuration
├── .env.example       # Environment variables template
└── package.json       # Project dependencies
```

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/modern-express-api.git
cd modern-express-api
```

2. **Set up environment variables**
```bash
cp .env.example .env
```

3. **Start the development environment**
```bash
# Install dependencies (if running locally)
npm install

# Build and start Docker services
npm run docker:build
npm run docker:up
```

The following services will be available:
- API: http://localhost:3000
- API Documentation: http://localhost:3000/api-docs
- pgAdmin: http://localhost:5050

## Development

### Available Scripts

```bash
# Start development environment with file watching
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
docker compose exec postgres psql -U postgres modern_api
```

### Database Management

Access pgAdmin at http://localhost:5050:
- Email: admin@admin.com (default)
- Password: admin (default)

To connect to the database in pgAdmin:
1. Add New Server
2. General:
   - Name: any name
3. Connection:
   - Host: postgres
   - Port: 5432
   - Database: modern_api
   - Username: postgres
   - Password: postgres

### API Documentation

OpenAPI documentation is available at http://localhost:3000/api-docs when running in development mode.

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get JWT token

### Users
- `GET /api/v1/users` - Get all users (Admin only)
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user (Admin only)

## Database Backups

### Create a backup
```bash
docker compose exec postgres pg_dump -U postgres modern_api > backup.sql
```

### Restore from backup
```bash
docker compose exec -T postgres psql -U postgres modern_api < backup.sql
```

## Common Issues and Solutions

### Services won't start
```bash
# Check service logs
npm run docker:logs

# Rebuild services
npm run docker:build
npm run docker:up
```

### Database connection issues
```bash
# Ensure postgres is healthy
docker compose ps

# Reset database volume
docker compose down -v
npm run docker:up
```

### File changes not reflecting
```bash
# Restart development mode
npm run docker:down
npm run docker:dev
```

## Production Deployment

1. **Build the application**
```bash
npm run build
```

2. **Set production environment variables**
```bash
cp .env.example .env.production
# Edit .env.production with production values
```

3. **Start production services**
```bash
docker compose -f compose.prod.yml up -d
```

## Security Considerations

This API implements several security best practices:
- CORS protection
- Helmet security headers
- Rate limiting
- JWT authentication
- Password hashing
- Input validation
- Error sanitization
- Secure headers
- Database connection pooling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Development Guidelines

### Code Style
- Use ESLint and Prettier for code formatting
- Follow TypeScript best practices
- Write meaningful commit messages

### Testing
```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### Branch Strategy
- `main` - production ready code
- `develop` - development code
- `feature/*` - new features
- `hotfix/*` - urgent fixes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Express.js team
- Drizzle ORM team
- Docker team
- OpenAPI Initiative

## Support

For support, please open an issue in the GitHub repository.