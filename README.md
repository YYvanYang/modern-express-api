# Modern Express API with Drizzle ORM

A modern, production-ready RESTful API built with Express 5 and Drizzle ORM.

## Features

- Express 5 with TypeScript
- Drizzle ORM for database operations
- JWT Authentication
- Role-based Authorization
- Request validation with Zod
- API rate limiting
- Error handling
- Request logging
- API documentation
- Database migrations
- Security best practices

## Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your database credentials and other settings.

4. Run database migrations:
```bash
npm run migrate
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get JWT token

### Users
- `GET /api/v1/users` - Get all users (Admin only)
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user (Admin only)

## Development

### Database Migrations

Generate migrations:
```bash
npm run generate
```

Apply migrations:
```bash
npm run migrate
```

### API Documentation

The API documentation is available at `/api-docs` when running in development mode.

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Security

This API implements several security best practices:
- CORS protection
- Helmet security headers
- Rate limiting
- JWT authentication
- Password hashing
- Input validation
- Error sanitization

## Error Handling

The API uses a centralized error handling system with custom error classes:
- `ValidationError` - 400 Bad Request
- `AuthenticationError` - 401 Unauthorized
- `AuthorizationError` - 403 Forbidden
- `NotFoundError` - 404 Not Found

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT